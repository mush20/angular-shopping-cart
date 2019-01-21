import { ProductModel } from '@app/models/product.model';
import { Sort } from '@angular/material';

enum ShoppingCartActionTypes {
  LIST_PRODUCTS = '[Shopping Cart] List Products',
  SELECT_PRODUCT = '[Shopping Cart] Select Product',
  ADD_PRODUCT = '[Shopping Cart] Add Product',
  REMOVE_PRODUCT = '[Shopping Cart] Remove Product',
  SORT_PRODUCTS = '[Shopping Cart] Sort Products'
}

export class ListProductAction {
  static readonly type = ShoppingCartActionTypes.LIST_PRODUCTS;
}

export class SelectProductAction {
  static readonly type = ShoppingCartActionTypes.SELECT_PRODUCT;

  constructor(public payload: string) {
  }
}

export class AddProductAction {
  static readonly type = ShoppingCartActionTypes.ADD_PRODUCT;

  constructor(public payload: ProductModel) {
  }
}

export class RemoveProductAction {
  static readonly type = ShoppingCartActionTypes.REMOVE_PRODUCT;

  constructor(public payload: string) {
  }
}

export class SortProductsAction {
  static readonly type = ShoppingCartActionTypes.SORT_PRODUCTS;

  constructor(public payload: Sort) {
  }
}
