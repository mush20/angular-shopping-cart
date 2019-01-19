
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as cartActions from './cart.actions';
import { CartService } from '../services/cart.service';

@Injectable()
export class CartEffects {
    @Effect()
    GetCartItems$: Observable<Action> = this.actions$.pipe(
        ofType(cartActions.CartActionTypes.GET_CART_ITEMS),
        switchMap(() => this.cartService.getCartItems()),
        map(data => new cartActions.GetCartItemsSuccess(data)),
        catchError(err => of(new cartActions.GetCartItemsError()))
    );

    @Effect()
    AddCartItem$: Observable<Action> = this.actions$.pipe(
        ofType(cartActions.CartActionTypes.ADD_CART_ITEM),
        switchMap((action: cartActions.AddCartItem) =>
            this.cartService.addCartItem(action.payload).pipe(
                map(data => new cartActions.AddCartItemSuccess(data)),
                catchError(err => of(new cartActions.AddCartItemError()))
            )
        )
    );

    @Effect()
    EditCartItem$: Observable<Action> = this.actions$.pipe(
        ofType(cartActions.CartActionTypes.EDIT_CART_ITEM),
        switchMap((action: cartActions.EditCartItem) =>
            this.cartService.editCartItem(action.payload).pipe(
                map(data => new cartActions.AddCartItemSuccess(data)),
                catchError(err => of(new cartActions.AddCartItemError()))
            )
        )
    );

    constructor(private actions$: Actions, private cartService: CartService) { }
}
