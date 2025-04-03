// hooks/useCheckout.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { OrderService } from '@/services/orderservice';
import { useCartStore } from '@/stores/cart-store';
import { CheckoutFormValues } from '@/features/checkout';

export const useCheckout = () => {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = () => {
        const authToken = Cookies.get('auth-token');
        setIsAuthenticated(!!authToken);
        setIsLoading(false);
        return !!authToken;
    };

    const handlePlaceOrder = async (values: CheckoutFormValues) => {
        if (!checkAuth()) {
            router.push('/login?redirect=/checkout');
            return;
        }

        setIsProcessing(true);
        const authToken = Cookies.get('auth-token');
        const userId = Cookies.get('user-id');

        const orderData = {
            userId,
            items,
            totalPrice,
            shippingAddress: {
                street: values.address,
                city: values.city,
                state: values.state,
                zipCode: values.zip,
                country: values.country,
            },
            paymentMethod: values.paymentMethod,
            billingDetails: {
                firstName: values.firstName,
                lastName: values.lastName,
            }
        };

        try {
            const order = await OrderService.createOrder(orderData, authToken);
            clearCart();
            router.push(`/order-confirmation/${order.id}`);
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isProcessing,
        isAuthenticated,
        isLoading,
        handlePlaceOrder,
        checkAuth
    };
};