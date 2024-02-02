import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import { ContactEmailComponent } from './layout/contact-email/contact-email.component';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    ContactEmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports : [
    
  ]
})
export class CoreModule { }
