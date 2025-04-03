/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { OrderService } from '@/services/orderservice';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import Cookies from 'js-cookie';
import { checkoutFormSchema, OrderSummaryCard, PaymentMethodCard, ShippingInformationCard } from '@/features/checkout';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCartStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = Cookies.get('auth-token');
        setIsAuthenticated(!!authToken);
        setIsLoading(false);
    }, []);

    const form = useForm({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            paymentMethod: 'credit_card',
            cardNumber: '',
            expiry: '',
            cvc: ''
        }
    });

    const paymentMethod = form.watch('paymentMethod');

    const handlePlaceOrder = async (values: any) => {
        if (!isAuthenticated) {
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <FiArrowLeft className="mr-2" />
                    Back to Cart
                </Button>
                <h1 className="text-2xl font-bold ml-4">Checkout</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePlaceOrder)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <ShippingInformationCard form={form} />
                        <PaymentMethodCard form={form} paymentMethod={paymentMethod} />
                    </div>

                    <div className="space-y-6">
                        <OrderSummaryCard isProcessing={isProcessing} />
                    </div>
                </form>
            </Form>
        </div>
    );
}