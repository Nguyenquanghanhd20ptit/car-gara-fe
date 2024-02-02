import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleConstants } from '../core/constants/title.constants';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared/shared.module';

const defaultUrl = "home";
const routers : Routes = [
  {
    path : "",
    redirectTo : defaultUrl,
    pathMatch : "full"
  },
  {
    path : "home",
    component : HomeComponent,
    data : {
      title : TitleConstants.HOME
    }
  }
]

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routers),
    ],
})
export class WebModule { }
