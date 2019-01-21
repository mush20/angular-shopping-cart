import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { ShoppingCartState } from '@app/states/shopping-cart.state';
import { Observable } from 'rxjs';
import { ProductModel } from '@app/models/product.model';
import { Select, Store } from '@ngxs/store';
import { AddProductAction, ListProductAction, RemoveProductAction, SelectProductAction } from '@app/actions/shopping-cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @Select(ShoppingCartState.products)
  products$: Observable<ProductModel[]>;

  @Select(ShoppingCartState.items)
  items$: Observable<ProductModel[]>;

  @Select(ShoppingCartState.total)
  total$: Observable<number>;

  @Select(ShoppingCartState.selected)
  selected$: Observable<ProductModel>;

  @HostBinding('class.content') cssClass = true;

  constructor(protected store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new ListProductAction());
  }

  selectProduct(name: string): void {
    this.store.dispatch(new SelectProductAction(name));
  }

  addProduct(item: ProductModel): void {
    this.store.dispatch(new AddProductAction(item));
  }

  removeProduct(name: string): void {
    this.store.dispatch(new RemoveProductAction(name));
  }
}
