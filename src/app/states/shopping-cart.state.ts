import { ShoppingCartStateModel } from '@app/models/shopping-cart-state.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductModel } from '@app/models/product.model';
import { ProductsService } from '@app/services/products.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { AddProductAction, ListProductAction, RemoveProductAction, SelectProductAction } from '@app/actions/shopping-cart.actions';
import { ProductsDataModel } from '@app/models/product-data.model';

const name = 'shoppingCart';

const defaults: ShoppingCartStateModel = {
  products: [],
  items: [],
  total: 0,
  selected: null,
  loading: false,
  error: false
};

@State<ShoppingCartStateModel>({
  name,
  defaults
})
export class ShoppingCartState {

  @Selector()
  static products(state: ShoppingCartStateModel): ProductModel[] {
    return state.products;
  }

  @Selector()
  static items(state: ShoppingCartStateModel): ProductModel[] {
    return state.items;
  }

  @Selector()
  static total(state: ShoppingCartStateModel): number {
    return state.total;
  }

  @Selector()
  static selected(state: ShoppingCartStateModel): ProductModel {
    return state.selected;
  }

  constructor(protected productsService: ProductsService) {
  }

  @Action(ListProductAction)
  listProductAction(ctx: StateContext<ShoppingCartStateModel>) {

    ctx.patchState({loading: true, error: false});

    return this.productsService.listProducts()
      .pipe(
        map((data: ProductsDataModel) => ctx.patchState({products: data.items})),
        catchError(() => ctx.patchState({error: true})),
        finalize(() => ctx.patchState({loading: false}))
      );
  }

  @Action(SelectProductAction)
  selectProductAction(ctx: StateContext<ShoppingCartStateModel>, {payload}: SelectProductAction) {
    const products = ctx.getState().products;
    const selected = products.find(search => search.name === payload);

    if (selected) {
      return ctx.patchState({selected});
    } else {
      return ctx.patchState({error: true});
    }
  }

  @Action(AddProductAction)
  addProductAction(ctx: StateContext<ShoppingCartStateModel>, {payload}: AddProductAction) {

    const items = Array.from(ctx.getState().items);
    const selectedIndex = items.findIndex(search => search.name === payload.name);

    // Product already in shopping cart
    if (selectedIndex >= 0) {
      const existent = Object.assign({}, items[selectedIndex]);
      existent.qty += payload.qty;
      existent.price = existent.qty * payload.price;
      items[selectedIndex] = existent;
    } else {

      // Product is not in shopping cart
      payload.price = payload.qty * payload.price;
      items.push(payload);
    }
    const total = this.calculateTotal(items);

    ctx.patchState({items, total});
  }

  @Action(RemoveProductAction)
  removeProductAction(ctx: StateContext<ShoppingCartStateModel>, {payload}: RemoveProductAction) {
    const items = Array.from(ctx.getState().items)
      .filter(search => search.name !== payload);

    const total = this.calculateTotal(items);

    ctx.patchState({items, total});
  }

  protected calculateTotal(items: ProductModel[]): number {
    return items.reduce((p, c) => p += c.price, 0);
  }
}
