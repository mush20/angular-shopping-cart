import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ShoppingCartState } from './shopping-cart.state';
import { ShoppingCartStateModel } from '@app/models/shopping-cart-state.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddProductAction, ListProductAction, RemoveProductAction, SelectProductAction } from '@app/actions/shopping-cart.actions';
import { UtilsModule } from '@utils/utils.module';
import { ProductsService } from '@app/services/products.service';

describe('ShoppingCartState', () => {

  let store: Store;
  let productsService: ProductsService;

  const testData = {
    'items': [
      {
        'name': 'Diamond',
        'price': 2000000
      }, {
        'name': 'Ruby',
        'price': 1500000
      }, {
        'name': 'Topaz',
        'price': 1000000
      }, {
        'name': 'Emeralds',
        'price': 1750000
      }, {
        'name': 'Opals',
        'price': 750000
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ShoppingCartState]),
        HttpClientTestingModule,
        UtilsModule
      ],
      providers: [
        ProductsService
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    productsService = TestBed.get(ProductsService);
  });

  it('should list the products ', async(() => {

    spyOn(productsService, 'listProducts').and.returnValue(of(testData));

    store.dispatch(new ListProductAction());
    store.select(state => state.shoppingCart)
      .subscribe((cart: ShoppingCartStateModel) => {
        expect(cart.products).toEqual(testData.items);
      });
  }));

  it('should add a product to shopping cart', async(() => {

    const product = {name: 'Topaz', price: 1000000, qty: 2};
    const expected = [{name: 'Topaz', price: 2000000, qty: 2}];

    store.dispatch(new AddProductAction(product));
    store.select(state => state.shoppingCart)
      .subscribe((cart: ShoppingCartStateModel) => {
        expect(cart.items).toEqual(expected);
        expect(cart.total).toEqual(2000000);
      });
  }));

  it('should select a product', async(() => {

    const product = {name: 'Topaz', price: 1000000, qty: 2};

    store.reset({products: testData.items, selected: null});

    store.dispatch(new SelectProductAction('Topaz'));
    store.select(state => {
      return state;
    })
      .subscribe((cart: ShoppingCartStateModel) => {
        expect(cart.selected).toEqual(product);
      });
  }));

  it('should add a product that already exists in shopping cart', async(() => {

    const product = {name: 'Topaz', price: 1000000, qty: 2};
    const items = [{name: 'Topaz', price: 2000000, qty: 2}];
    const expected = [{name: 'Topaz', price: 4000000, qty: 4}];

    store.reset({products: testData.items, items});

    store.dispatch(new AddProductAction(product));
    store.select(state => state.shoppingCart)
      .subscribe((cart: ShoppingCartStateModel) => {
        expect(cart.items).toEqual(expected);
        expect(cart.total).toEqual(4000000);
      });
  }));

  it('should remove a product', async(() => {

    const items = [
      {name: 'Topaz', price: 2000000, qty: 2},
      {name: 'Ruby', price: 1500000, qty: 1}
    ];
    const expected = [{name: 'Ruby', price: 1500000, qty: 1}];

    store.reset({products: testData.items, items});

    store.dispatch(new RemoveProductAction('Topaz'));
    store.select(state => state.shoppingCart)
      .subscribe((cart: ShoppingCartStateModel) => {
        expect(cart.items).toEqual(expected);
        expect(cart.total).toEqual(1500000);
      });
  }));
});
