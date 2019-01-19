import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductItem, ICartData } from 'src/app/interfaces/cart.model';
import { RootState } from 'src/app/redux/app.state';
import * as cartActions from 'src/app/redux/cart.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-cart-add',
    templateUrl: './cart-add.component.html'
})
export class CartAddComponent implements OnInit {

    @Input() productItems: IProductItem[];
    @Input() set selectedItem(value: ICartData) {
        if (!value) { return; }
        this.cartAddForm.controls.item.setValue(value.name);
        this.cartAddForm.controls.quantity.setValue(value.qty);
        this.price = value.price;
        this.isEdit = true;
    }

    public price: number;
    public cartAddForm: FormGroup;
    public isEdit: Boolean = false;

    constructor(private store: Store<RootState>) { }

    ngOnInit() {
        this.initCartFrom();
    }

    initCartFrom() {
        this.cartAddForm = new FormGroup({
            item: new FormControl(null, [Validators.required]),
            quantity: new FormControl(0, [Validators.required])
        });
    }

    changeItem() {
        const formItem = this.cartAddForm.controls.item.value;
        const formQuantity = this.cartAddForm.controls.quantity.value;
        const selectedItem = this.productItems.filter((item: IProductItem) => item.name === formItem).shift();
        this.price = formQuantity ? (selectedItem.price * formQuantity) : 0;
    }
    addToCart() {
        this.store.dispatch(new cartActions.AddCartItem({
            name: this.cartAddForm.controls.item.value,
            qty: this.cartAddForm.controls.quantity.value,
            price: this.price
        }));
    }
    editCartItem() {
        this.isEdit = false;
        this.store.dispatch(new cartActions.EditCartItem({
            name: this.cartAddForm.controls.item.value,
            qty: this.cartAddForm.controls.quantity.value,
            price: this.price
        }));
    }
}
