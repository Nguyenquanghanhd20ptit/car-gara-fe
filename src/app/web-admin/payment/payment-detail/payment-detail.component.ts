import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/core/service/app/order/order.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {

  public order : any;
  constructor(private route : ActivatedRoute,
    private orderService : OrderService,
    private router : Router,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      let orderId = +params["id"];
      this.getOrderById(orderId)
    })
  }

  getOrderById(id){
    this.orderService.getById(id).subscribe((data) =>{
      if(data.errorCode && data.errorCode === "00"){
        this.order = JSON.parse(data.data);
      } else if(data.errorCode){
        this.toastr.error(data.errorMessage);
      } else {
        this.toastr.error("get order thất bại")
      }
    })
  }
  paymentInCash(){

  }
  paymentWithMomo(){
    this.orderService.updateStatusOrderIsSuccess(this.order.id).subscribe((data)=>{
      if(data.errorCode && data.errorCode === "00"){
        this.router.navigateByUrl("/admin/booking")
      } else if(data.errorCode){
        this.toastr.error(data.errorMessage);
      } else {
        this.toastr.error("update status order thất bại")
      }
    })
  }
}
