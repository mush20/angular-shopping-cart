import { IProductResponse } from '../interfaces/cart.model';

export interface IProductState {
    isLoading: boolean;
    data: IProductResponse;
}

export const initialState: IProductState = {
    isLoading: false,
    data: null
};
