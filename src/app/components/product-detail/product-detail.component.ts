import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@app/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  private _selected: ProductModel = null;
  form: FormGroup;

  @Input() products: ProductModel[];

  @Input() set selected(value: ProductModel) {
    if (value && JSON.stringify(value) !== JSON.stringify(this._selected)) {
      this._selected = value;
      this.form.patchValue(value);
    }
  }

  @Output() select: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<ProductModel> = new EventEmitter();

  @HostBinding('class.products-detail') cssClass = true;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  protected initForm(): void {

    // Form controls
    const name = new FormControl('', Validators.required);
    const qty = new FormControl('', Validators.required);
    const price = new FormControl('', Validators.required);

    this.form = new FormGroup({
      name,
      price,
      qty
    });
  }

  selectProduct(name: string): void {
    this.select.next(name);
  }

  addProduct(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const name = formValue.name;
      const price = Number.parseInt(formValue.price, 10);
      const qty = Number.parseInt(formValue.qty, 10);

      this.add.next({name, price, qty});
    }
  }

}
