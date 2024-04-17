import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccessoryDialogComponent } from '../accessory-dialog/accessory-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/core/service/app/service/service.service';

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss']
})
export class ServiceDialogComponent implements OnInit {

  public services = [];
  isUpdate: boolean;
  searchValue: "";
  public searchTimeout : any;
  constructor( private toastr: ToastrService,
    private serviceService : ServiceService,
    public dialogRef: MatDialogRef<AccessoryDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
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
    this.serviceService.searchService(body).subscribe((data: any) => {
      if (data && data.error_code === "00") {
        let pageResponse = JSON.parse(data.data);
        this.services = pageResponse.items;
      }
      else if (data && data.error_message) {
        this.toastr.error(data.error_message);
      } else {
        this.toastr.error("Đã có lỗi sảy ra");
      }
    });
  }

  chooseService(index){
    let service = this.services[index];
    this.cancel(service);
  }
  cancel(isSuccess){
    this.dialogRef.close(isSuccess);
  }
 
  onSearchChange() {
    clearTimeout(this.searchTimeout); 
    this.searchTimeout = setTimeout(() => {
      this.getServices();
    }, 500);
  }
}
