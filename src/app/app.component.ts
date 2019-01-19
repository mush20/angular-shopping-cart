import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './redux/app.state';
import { Subscription, Observable } from 'rxjs';
import { IProductItem, ICartData } from './interfaces/cart.model';
import * as cartActions from '../app/redux/cart.actions';
import * as productActions from '../app/redux/product.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public productItems: IProductItem[];
  public selectedItem: IProductItem;
  public productSubScription: Subscription;

  constructor(
    private store: Store<RootState>
  ) {
    this.store.dispatch(new productActions.GetProductItems());
  }

  ngOnInit() {
    this.productSubScription = this.store.select((state) => state.product).subscribe((cart) => {
      if (cart.data && cart.data.items) {
        this.productItems = cart.data.items;
      }
    });
  }

  ngOnDestroy() {
    if (this.productSubScription) { this.productSubScription.unsubscribe(); }
  }

  editData(cartItem: ICartData) {
    this.selectedItem = cartItem;
  }
}
