import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { UtilsModule } from '@utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
