import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { AccessoryDialogComponent } from './accessory-dialog/accessory-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { TitleConstants } from 'src/app/core/constants/title.constants';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';



const routers : Routes = [
  {
    path : ":bookingId",
    component : PaymentComponent,
    data : {
      title : TitleConstants.HOME
    }
  },{
    path : "detail/:id",
    component : PaymentDetailComponent,
    data : {
      title : TitleConstants.HOME
    }
  }
]


@NgModule({
  declarations: [BookingDialogComponent, 
    ServiceDialogComponent,
     AccessoryDialogComponent,
     PaymentDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule ,
    RouterModule.forChild(routers),
  ],
})
export class PaymentModule { }
