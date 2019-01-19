import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './app.state';
import { cartReducer } from './cartReducers';
import { productReducer } from './product.reducers';

export const reducers: ActionReducerMap<RootState> = {
  product: productReducer,
  cart: cartReducer
};
