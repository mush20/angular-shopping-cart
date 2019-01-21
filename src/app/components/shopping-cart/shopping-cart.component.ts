import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@app/models/product.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {

  visibleColumns = ['name', 'qty', 'price', 'remove'];

  @Input() items: ProductModel[];
  @Input() total: number;

  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  @HostBinding('class.shopping-cart') cssClass = true;

  constructor() {
  }

  ngOnInit() {
  }

  removeProduct(name: string): void {
    this.remove.next(name);
  }

  sortData(sort: Sort): void {
    this.sort.next(sort);
  }

}
