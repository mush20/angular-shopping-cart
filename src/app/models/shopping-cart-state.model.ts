import { ProductModel } from '@app/models/product.model';

export interface ShoppingCartStateModel {
  products: ProductModel[];
  items: ProductModel[];
  total: number;
  selected: ProductModel;
  loading: boolean;
  error: boolean;
}
