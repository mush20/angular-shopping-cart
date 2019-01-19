export interface IProductItem {
    name: string;
    price: number;
}

export interface IProductResponse {
    items: IProductItem[];
}

export interface ICartResponse {
    flag: boolean;
}

export interface ICartData {
    name: string;
    qty: number;
    price: number;
}