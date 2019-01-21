import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsDataModel } from '@app/models/product-data.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(protected httpClient: HttpClient) {
  }

  listProducts(): Observable<ProductsDataModel> {
    return this.httpClient.get<ProductsDataModel>('../../assets/data/product.json');
  }
}
