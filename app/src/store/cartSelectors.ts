import { AppState } from './index';

// Selector to get all items in the cart
export const selectCartItems = (state: AppState) => state.cart.items;

// Selector to get the total number of items in the cart
export const selectCartTotalItems = (state: AppState) => state.cart.items.length;

// Selector to get the total price of all items in the cart
export const selectCartTotalPrice = (state: AppState) =>
    state.cart.items.reduce((total, item) => total + item.price, 0);
