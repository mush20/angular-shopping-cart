import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICartData } from 'src/app/interfaces/cart.model';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-listing',
    templateUrl: './cart-listing.component.html',
    styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent implements OnInit {

    @Output() editData: EventEmitter<ICartData> = new EventEmitter();

    public cartData$: Observable<ICartData[]>;

    constructor(private cartService: CartService) { }

    ngOnInit() {
        this.cartData$ = this.cartService.getCartData();
    }
    removeItem(cartItem: ICartData) {
        this.cartService.removeCartItem(cartItem);
    }
    editItem(cartItem: ICartData) {
        this.editData.emit(cartItem);
    }
}
