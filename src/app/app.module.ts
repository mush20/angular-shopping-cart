import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CartAddComponent } from './components/cart-add/cart-add.component';
import { CommonModule } from '@angular/common';
import { CartListingComponent } from './components/cart-listing/cart-listing.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './redux/app.reducers';
import { CartEffects } from './redux/cart.effects';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductEffects } from './redux/product.effect';

@NgModule({
  declarations: [
    AppComponent,
    CartAddComponent,
    CartListingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CartEffects, ProductEffects]),
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule {}