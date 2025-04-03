/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    status: string | undefined;
    estimatedDelivery: string | undefined;
    id: string;
    userId: string;
    items: OrderItem[];
    shippingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod?: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt: Date;
}

interface OrderStore {
    orders: Order[];
    createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'isPaid' | 'isDelivered'>) => Order;
    getOrder: (id: string) => Order | undefined;
    getUserOrders: (userId: string) => Order[];
    updateOrderPayment: (id: string, paymentResult: any) => void;
    updateOrderDelivery: (id: string) => void;
    clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
    persist(
        (set, get) => ({
            orders: [],
            createOrder: (order) => {
                const newOrder: Order = {
                    ...order,
                    id: Date.now().toString(),
                    isPaid: false,
                    isDelivered: false,
                    createdAt: new Date(),
                };
                set({ orders: [...get().orders, newOrder] });
                return newOrder;
            },
            getOrder: (id) => get().orders.find((o) => o.id === id),
            getUserOrders: (userId) => get().orders.filter((o) => o.userId === userId),
            updateOrderPayment: (id, paymentResult) => {
                set({
                    orders: get().orders.map((o) =>
                        o.id === id
                            ? {
                                ...o,
                                isPaid: true,
                                paidAt: new Date(),
                                paymentResult,
                            }
                            : o
                    ),
                });
            },
            updateOrderDelivery: (id) => {
                set({
                    orders: get().orders.map((o) =>
                        o.id === id
                            ? {
                                ...o,
                                isDelivered: true,
                                deliveredAt: new Date(),
                            }
                            : o
                    ),
                });
            },
            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: 'order-storage', // localStorage key
        }
    )
);