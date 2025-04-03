/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOrderStore } from '@/stores/order-store';

// Mock API functions (client-side only)
export const OrderService = {
    createOrder: (orderData: any, authToken: unknown) => {
        const order = useOrderStore.getState().createOrder(orderData);
        return Promise.resolve(order);
    },

    getOrders: (userId: string) => {
        const orders = useOrderStore.getState().getUserOrders(userId);
        return Promise.resolve(orders);
    },

    getOrderById: (id: string) => {
        const order = useOrderStore.getState().getOrder(id);
        return Promise.resolve(order);
    },

    updatePaymentStatus: (id: string, paymentResult: any) => {
        useOrderStore.getState().updateOrderPayment(id, paymentResult);
        return Promise.resolve({ success: true });
    },

    updateDeliveryStatus: (id: string) => {
        useOrderStore.getState().updateOrderDelivery(id);
        return Promise.resolve({ success: true });
    },
};