import { CartAction, CartActionTypes } from './cart.actions';
import { ICartState, initialState } from './cart.state';

export function cartReducer(state: ICartState = initialState, action: CartAction): ICartState {
    switch (action.type) {

        case CartActionTypes.GET_CART_ITEMS: {
            return {
                ...state,
                isLoading: true
            };
        }
        case CartActionTypes.GET_CART_ITEMS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        }

        case CartActionTypes.GET_CART_ITEMS_ERROR: {
            return {
                ...state
            };
        }

        default:
            return state;
    }
}