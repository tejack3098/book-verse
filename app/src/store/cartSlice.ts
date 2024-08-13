import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../models/ICartItem';

export interface CartState {
    items: ICartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Partial<ICartItem>>) => {
          
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
      
            if (existingItem) {
              existingItem.quantity += 1;
              
            } else {
              state.items.push({ ...item, quantity: 1 } as ICartItem);
              state.items.forEach(x => console.log(x.id))
            }
          },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
          },
    },
});

export const { addToCart, removeFromCart ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
