
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as productActions from './product.action';
import { CartService } from '../services/cart.service';

@Injectable()
export class ProductEffects {
    @Effect()
    GetCartItems$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.GET_PRODUCT_ITEMS),
        switchMap(() => this.cartService.getProducts()),
        map(data => new productActions.GetProductItemsSuccess(data)),
        catchError(err => of(new productActions.GetProductItemsError()))
    );

    constructor(private actions$: Actions, private cartService: CartService) { }
}
