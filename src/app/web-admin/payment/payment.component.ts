import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccessoryDialogComponent } from './accessory-dialog/accessory-dialog.component';
import { BookingService } from 'src/app/core/service/app/booking/booking.service';
import { OrderService } from 'src/app/core/service/app/order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  public isDialogOpen : boolean;
  public services: any = [];
  public accessorys: any = [];
  public orderProducts : any = [];
  public totalPrice : number = 0;
  public quantityAccessory = [];
  public bookingId : number;
  public booking : any;
  constructor(private router : Router,
    private route : ActivatedRoute,
    private bookingService : BookingService,
    private dialog: MatDialog,
    private order : OrderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.bookingId = +params["bookingId"]
      this.getBookingById(this.bookingId);
    })
    this.updateTotalPrice();
    this.orderProducts.push([]);
    this.updateAccessorys();
  }

  getBookingById(id){
    this.bookingService.getDetail(id).subscribe((data) =>{
      if(data.errorCode && data.errorCode === "00"){
        this.booking = JSON.parse(data.data);
      } else if(data.errorCode){
        this.toastr.error(data.errorMessage);
      } else {
        this.toastr.error("get booking thất bại")
      }
    })
  }
 
  updateTotalPrice(){
    this.totalPrice = 0;
    for(let i = 0 ; i < this.accessorys.length;i++){
      this.totalPrice += this.accessorys[i].totalPrice;
    }
    for(let i = 0 ; i< this.services.length; i++){
      this.totalPrice += this.services[i].price;
    }
  }
  
  chooseNewService() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: "400px",
      disableClose: true,
    });
    this.isDialogOpen = true;
    dialogRef.componentInstance.isUpdate = true;
    dialogRef.afterClosed().subscribe((result) => {
      this.showchooseNewService(result, 'chooseSuccess');
    });
  }
  showchooseNewService(result, type) {
    this.isDialogOpen = false;
    if (result) {
      let service = result;
      const index = this.services.findIndex(item => item.id === service.id);
      if (index !== -1) {
        this.services[index] = service;
      } else {
        this.services.push(service);
      }
      this.toastr.success(type);
    }
  }

  chooseNewAccessory(){
    const dialogRef = this.dialog.open(AccessoryDialogComponent, {
      width: "400px",
      disableClose: true,
    });
    this.isDialogOpen = true;
    console.log(this.isDialogOpen);
    dialogRef.componentInstance.isUpdate = true;
    dialogRef.componentInstance.quantityAccessory = this.quantityAccessory;
    dialogRef.afterClosed().subscribe((result) => {
      this.showchooseNewAccessory(result, 'chooseSuccess');
    });
  }
  showchooseNewAccessory(result, type) {
    this.isDialogOpen = false;
    if (result) {
      let accessory = result.accessory;
      const index = this.accessorys.findIndex(item => item.id === accessory.id);
      if (index !== -1) {
        this.accessorys[index] = accessory;
      } else {
        this.accessorys.push(accessory);
      }
      this.quantityAccessory = result.quantityAccessory;
      this.toastr.success(type);
      this.updateTotalPrice();
    }
  }

  updateAccessorys(){
    this.updateTotalPrice();
    for(let i = 0 ; i < this.accessorys.length ; i++){
      let accessory = this.accessorys[i];
      let totalPrice =  accessory.price * 1;
      this.accessorys[i].totalPrice = totalPrice;
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
          this.accessorys[i].totalPrice = totalPrice;
        }
      }
    }

    deleteItemAccessory(index: number) {
      if (index >= 0 && index < this.accessorys.length) {
        this.accessorys.splice(index, 1);
        this.quantityAccessory.splice(index, 1);
        this.toastr.success('Phụ kiện đã được xóa');
        this.updateTotalPrice();
      } else {
        this.toastr.error('Lỗi: Không thể xóa phụ kiện');
      }
    }
    deleteItemService(index:number){
      if (index >= 0 && index < this.services.length) {
        this.services.splice(index, 1);
        this.toastr.success('Phụ kiện đã được xóa');
        this.updateTotalPrice();
      } else {
        this.toastr.error('Lỗi: Không thể xóa phụ kiện');
      }
    }

    createInvoice(){
      let serviceOrders: any[] = []; 
      for(let i = 0 ;i < this.services.length;i++){
        let body = {
          total_price : this.services[i].price,
          currency : "VNĐ",
          service_id : this.services[i].id
        }
        serviceOrders.push(body);
      }
      let accessoryOrders: any[] = [];
      for(let i = 0 ; i < this.accessorys.length; i++){
        let body = {
          quantity :  this.quantityAccessory[i],
          total_price : this.accessorys[i].price * this.quantityAccessory[i],
          currency : "VNĐ",
          accessory_id : this.accessorys[i].id
        }
        accessoryOrders.push(body);
      }
      let body = {
        total_price : this.totalPrice,
        currency : "VNĐ",
        service_order : serviceOrders,
        accessory_order : accessoryOrders,
        customer_id :  this.booking.customer.id,
        booking_id : this.booking.id
      }

      this.order.addNew(body).subscribe((data : any) => {
        if(data.errorCode && data.errorCode === "00"){
          let orderId = JSON.parse(data.data);
          console.log(orderId);
          this.toastr.success("Thêm đơn hàng thành công")
          this.router.navigate(["/admin/payment/detail",orderId])
        }else if(data.errorCode){
          this.toastr.error(data.errorMessage);
        }
        else {
          this.toastr.error("Thêm thất bại")
        }
        
      })
      
    }
}
