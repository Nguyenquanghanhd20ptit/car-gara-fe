import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
      ]
    };
  }
}
