import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleConstants } from '../core/constants/title.constants';
import { CarComponent } from './car/car.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared/shared.module';
import { StatisticsRevenueComponent } from './statistics-revenue/statistics-revenue.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';

const routers : Routes = [
  {
    path : "customer",
    component : CustomerComponent,
    data : {
      title : TitleConstants.HOME
    }
  },
  {
    path : "customer/addNew",
    component : AddCustomerComponent,
    data : {
      title : TitleConstants.HOME
    }
  },
  {
    path : "customer/update/:id",
    component : EditCustomerComponent,
    data : {
      title : TitleConstants.HOME
    }
  },
  {
    path : "car",
    component : CarComponent,
    data : {
      title : TitleConstants.HOME
    }
  },
  {
    path : "booking",
    component : BookingComponent,
    data : {
      title : TitleConstants.HOME
    }
  },
  {
    path : "booking/:id",
    component : BookingDetailComponent,
    data : {
      title : TitleConstants.HOME
    }
  },{
    path : "payment",
    loadChildren : () => import('src/app/web-admin/payment/payment.module').then(m => m.PaymentModule),
    data: { preload: true },
    resolve: {
    }
  },
  {
    path : "statistic-revenue",
    component : StatisticsRevenueComponent,
    data : {
      title : TitleConstants.HOME
    }
  }
]

@NgModule({
  declarations: [CustomerComponent, CarComponent, PaymentComponent, StatisticsRevenueComponent, AddCustomerComponent, EditCustomerComponent, BookingComponent, BookingDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routers),
    ],
})
export class WebAdminModule { }
