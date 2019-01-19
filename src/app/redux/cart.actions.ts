import { Action } from '@ngrx/store';
import { ICartResponse, ICartData } from '../interfaces/cart.model';

export enum CartActionTypes {
    GET_CART_ITEMS = '[Cart] Get Cart: Initiate',
    GET_CART_ITEMS_SUCCESS = '[Cart] Get Cart: Success',
    GET_CART_ITEMS_ERROR = '[Cart] Get Cart: Error',
    ADD_CART_ITEM = '[Cart] Add Cart Item: Initiate',
    ADD_CART_ITEM_SUCCESS = '[Cart] Add Cart Item: Success',
    ADD_CART_ITEM_ERROR = '[Cart] Add Cart Item: Error',
    EDIT_CART_ITEM = '[Cart] Edit Cart Item: Initiate',
    EDIT_CART_ITEM_SUCCESS = '[Cart] Edit Cart Item: Success',
    EDIT_CART_ITEM_ERROR = '[Cart] Edit Cart Item: Error',
}


export class GetCartItems implements Action {
    readonly type = CartActionTypes.GET_CART_ITEMS;
}
export class GetCartItemsSuccess implements Action {
    readonly type = CartActionTypes.GET_CART_ITEMS_SUCCESS;
    constructor(public payload: ICartResponse) { }
}

export class GetCartItemsError implements Action {
    readonly type = CartActionTypes.GET_CART_ITEMS_ERROR;
}


export class AddCartItem implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM;
    constructor(public payload: ICartData) { }
}
export class AddCartItemSuccess implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM_SUCCESS;
    constructor(public payload: ICartResponse) { }
}
export class AddCartItemError implements Action {
    readonly type = CartActionTypes.ADD_CART_ITEM_ERROR;
}

export class EditCartItem implements Action {
    readonly type = CartActionTypes.EDIT_CART_ITEM;
    constructor(public payload: ICartData) { }
}
export class EditCartItemSuccess implements Action {
    readonly type = CartActionTypes.EDIT_CART_ITEM_SUCCESS;
    constructor(public payload: ICartResponse) { }
}
export class EditCartItemError implements Action {
    readonly type = CartActionTypes.EDIT_CART_ITEM_ERROR;
}

export type CartAction =
    GetCartItems | GetCartItemsSuccess | GetCartItemsError | AddCartItem | AddCartItemSuccess |
    AddCartItemError | EditCartItem | EditCartItemSuccess | EditCartItemError
    ;
