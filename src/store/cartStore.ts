/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface ICart {
    cart: any[];

    setCart: (data: any) => void;
    removeOne: (item: any) => void;
    clearCart: () => void;
}
export const useCartStore = create<ICart>((set) => ({
    cart: [],

    //setCart
    setCart: (data: any | any[]) => {
        set((state) => ({
            cart: Array.isArray(data) ? [...state.cart, ...data] : [...state.cart, data],
        }));
    },
    // removeOne
    removeOne: (item: any) => {
        set((state) => ({
            cart: state.cart.filter((cartItem) => cartItem !== item),
        }));
    },

    clearCart: () => {
        set({ cart: [] });
    },
}))