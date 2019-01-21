import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { UtilsModule } from '@utils/utils.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  declarations: [
    ProductDetailComponent
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class ProductDetailModule { }
