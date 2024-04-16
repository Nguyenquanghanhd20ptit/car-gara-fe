import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULE = [
  MaterialModule,
  ReactiveFormsModule,
  FormsModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULE
  ],
  exports : [...MODULE],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
