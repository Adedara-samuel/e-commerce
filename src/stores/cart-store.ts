import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                const existingItem = get().items.find((i) => i.id === item.id);
                if (existingItem) {
                    set({
                        items: get().items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 0 } : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, { ...item, quantity: 1 }] });
                }
            },
            removeItem: (id) => {
                set({
                    items: get().items.filter((i) => i.id !== id),
                });
            },
            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => {
                set({ items: [] });
            },
            totalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
            totalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);