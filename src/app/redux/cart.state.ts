import { ICartResponse } from '../interfaces/cart.model';

export interface ICartState {
    isLoading: boolean;
    data: ICartResponse;
}

export const initialState: ICartState = {
    isLoading: false,
    data: null
};
