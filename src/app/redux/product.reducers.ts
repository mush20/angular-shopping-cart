import { CartActionTypes } from './cart.actions';
import { initialState } from './product.state';
import { IProductState } from './product.state';
import { ProductActionTypes, ProductAction } from './product.action';

export function productReducer(state: IProductState = initialState, action: ProductAction): IProductState {
    switch (action.type) {

        case ProductActionTypes.GET_PRODUCT_ITEMS: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ProductActionTypes.GET_PRODUCT_ITEMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        }

        case ProductActionTypes.GET_PRODUCT_ITEMS_ERROR: {
            return {
                ...state
            };
        }

        default:
            return state;
    }
}
