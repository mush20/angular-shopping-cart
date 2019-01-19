import { ICartState } from './cart.state';
import { IProductState } from './product.state';

export interface RootState {
    product: IProductState;
    cart: ICartState;
}
