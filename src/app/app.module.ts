import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UtilsModule } from '@utils/utils.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { ProductDetailModule } from '@app/components/product-detail/product-detail.module';
import { ShoppingCartModule } from '@app/components/shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UtilsModule,
    NgxsModule.forRoot([], {developmentMode: !environment.production}),
    ProductDetailModule,
    ShoppingCartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
