import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccessoryService } from 'src/app/core/service/app/accessory/accessory.service';

@Component({
  selector: 'app-accessory-dialog',
  templateUrl: './accessory-dialog.component.html',
  styleUrls: ['./accessory-dialog.component.scss']
})
export class AccessoryDialogComponent implements OnInit {
  isUpdate: boolean;
  public accessorys: any = [];
  public quantityAccessory = [];
  public searchValue = "";
  public searchTimeout: any;
  constructor( private toastr: ToastrService,
    private accessoryService : AccessoryService,
    public dialogRef: MatDialogRef<AccessoryDialogComponent>,
  ) { }

  ngOnInit(): void {
    if(this.isUpdate == true){
       this.getAccesorys();
    }
  }

  getAccesorys(){

    let body = {
      "keyword": this.searchValue,
      "filters": [],
      "pageable": {
        "page": 1,
        "page_size": 30,
        "sort": [
          { "property": "id", "direction": "asc" }
        ]
      }
    }
    this.accessoryService.searchAccessory(body).subscribe((data: any) => {
      if (data && data.error_code === "00") {
        let pageResponse = JSON.parse(data.data);
        this.accessorys = pageResponse.items;
        this.updateAccessorys();
      }
      else if (data && data.error_message) {
        this.toastr.error(data.error_message);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }
  
  updateAccessorys(){
    let check = false;
    if(this.quantityAccessory.length == 0) check = true;
    for(let i = 0 ; i < this.accessorys.length ; i++){
      let accessory = this.accessorys[i];
      let totalPrice =  accessory.price * 1;
      this.accessorys[i].total_price = totalPrice;
      if(check) this.quantityAccessory.push(1);
    }
  }

  updatePaymentNum(index : number,quantity : number) {
    if (this.quantityAccessory[index] > quantity) {
        this.quantityAccessory[index] = quantity;
        this.toastr.error(`Bạn chỉ có thể thêm ${quantity} sản phẩm`)
    }
    
    this.updateAccessorysIndex(index);
}

  quantyDown(index : number) {
    this.quantityAccessory[index] > 1 ?  this.quantityAccessory[index]-- : 1;
    this.updateAccessorysIndex( index);
    }

    quantyUp(index : number,quantity : number) {
      this.quantityAccessory[index] < quantity ? this.quantityAccessory[index] ++ : quantity;
       if( this.quantityAccessory[index] > quantity)  this.quantityAccessory[index] = quantity;

       this.updateAccessorysIndex( index);
    }
    updateAccessorysIndex(index : number){
      for(let i = 0 ; i < this.accessorys.length ; i++){
        if(i === index){
          let accessory = this.accessorys[i];
          let totalPrice =  accessory.price * this.quantityAccessory[index];
          this.accessorys[i].total_price = totalPrice;
        }
      }
    }

    chooseAccessory(index){
      let accessory = this.accessorys[index];
      let data = {
        accessory : accessory,
        quantityAccessory : this.quantityAccessory
      }
      this.cancel(data);
    }

    cancel(isSuccess) {
      this.dialogRef.close(isSuccess);
    }

    onSearchChange() {
      clearTimeout(this.searchTimeout); 
      this.searchTimeout = setTimeout(() => {
        this.getAccesorys();
      }, 500);
    }

}


