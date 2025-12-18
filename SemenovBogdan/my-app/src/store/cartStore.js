import { create } from 'zustand';

export const useCartStore = create((set) => ({
	cart: [],

	addToCart: (product) =>
		set((state) => ({ cart: [...state.cart, product] })),

	removeFromCart: (index) =>
		set((state) => ({ cart: state.cart.filter((_, i) => i !== index) })),

	clearCart: () => set({ cart: [] }),
}));
