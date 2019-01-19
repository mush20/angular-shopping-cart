import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductResponse, ICartResponse, ICartData } from '../interfaces/cart.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CartService {
    constructor(private httpClient: HttpClient) { }

    private cartData$ = new BehaviorSubject<ICartData[]>([]);

    public getProducts(): Observable<IProductResponse> {
        return this.httpClient.get<IProductResponse>('../../assets/data/product.json').pipe(
            catchError(err => {
                throw err;
            })
        );
    }
    // Idealy after add an item to cart, we call this to make sure we get the latest
    // Redux will update the cart from the FE but, there is no garantee the cart is acurate
    public getCartItems(): Observable<ICartResponse> {
        return of({ flag: true });
    }

    public getCartData(): Observable<ICartData[]> {
        return this.cartData$.asObservable();
    }
    public removeCartItem(cartItem: ICartData) {
        const newCartItems = this.cartData$.value.filter((item) => item.name !== cartItem.name);
        this.cartData$.next(newCartItems);
    }
    public editCartItem(cartItem: ICartData) {
        const newCartItems = this.cartData$.value.map((item: ICartData) => {
            if (item.name === cartItem.name) {
                return {
                    name: item.name,
                    qty: cartItem.qty,
                    price: cartItem.price
                };
            } else {
                return item;
            }
        });
        this.cartData$.next(newCartItems);
        return of({ flag: true });
    }
    public addCartItem(addToCartData: ICartData): Observable<ICartResponse> {
        // Call add api here with addToCartData
        // Usuallt I will do this in Redux. but ... run out of time
        const existingCartItem = this.cartData$.value.filter((item) => item.name === addToCartData.name);
        if (existingCartItem.length) {
            const newCartItems = this.cartData$.value.map((item: ICartData) => {
                if (item.name === addToCartData.name) {
                    return {
                        name: item.name,
                        qty: item.qty + addToCartData.qty,
                        price: item.price + addToCartData.price
                    };
                } else {
                    return item;
                }
            });
            this.cartData$.next(newCartItems);
        } else {
            this.cartData$.next([...this.cartData$.value, ...[addToCartData]]);
        }
        return of({ flag: true });
    }
}
