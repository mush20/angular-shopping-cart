import { ShoppingCartStateModel } from '@app/models/shopping-cart-state.model';
import { State } from '@ngxs/store';
import { ProductsService } from '@app/services/products.service';

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

  constructor(protected productsService: ProductsService) {
  }
}
