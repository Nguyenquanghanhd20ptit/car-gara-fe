import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from 'src/app/core/app/app-routing.module';
import { BookingService } from 'src/app/core/service/app/booking/booking.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

  public booking : any;
  constructor(private bookingService : BookingService, 
    private toastr : ToastrService,
    private router : Router,
    private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let bookingId  = +params['id'];
      this.getBookingById(bookingId);
    });
  }
  getBookingById(id){
    this.bookingService.getDetail(id).subscribe((data) =>{
      if(data.errorCode && data.errorCode === "00"){
        this.booking = JSON.parse(data.data);
      } else if(data.errorCode){
        this.toastr.error(data.errorMessage);
      } else {
        this.toastr.error("get customer thất bại")
      }
    })
  }

  navigateURl(){
    this.router.navigate(["/admin/payment",this.booking.id])
  }
}
