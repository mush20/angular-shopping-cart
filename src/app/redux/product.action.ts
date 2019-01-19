import { Action } from '@ngrx/store';
import { IProductResponse } from '../interfaces/cart.model';

export enum ProductActionTypes {
    GET_PRODUCT_ITEMS = '[Product] Get Product: Initiate',
    GET_PRODUCT_ITEMS_SUCCESS = '[Product] Get product: Success',
    GET_PRODUCT_ITEMS_ERROR = '[Product] Get product: Error',
}


export class GetProductItems implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT_ITEMS;
}
export class GetProductItemsSuccess implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT_ITEMS_SUCCESS;
    constructor(public payload: IProductResponse) { }
}

export class GetProductItemsError implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT_ITEMS_ERROR;
}


export type ProductAction =
    GetProductItems | GetProductItemsSuccess | GetProductItemsError
    ;
