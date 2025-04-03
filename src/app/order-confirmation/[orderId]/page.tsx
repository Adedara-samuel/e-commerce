/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OrderService } from '@/services/orderservice';
import Image from 'next/image';
import Cookies from 'js-cookie';
import React from 'react';
import { OrderDrawer } from '@/features/orders';

interface Order {
    id: string;
    status?: string;
    totalPrice: number;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    estimatedDelivery?: string;
}

export default function OrderConfirmationPage() {
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const authToken = Cookies.get('auth-token');
                if (!authToken) {
                    router.push('/login');
                    return;
                }

                const { orderId } = useParams();
                if (!orderId || typeof orderId !== 'string') {
                    setError('Invalid order ID');
                    setLoading(false);
                    return;
                }

                const orderData = await OrderService.getOrderById(orderId);
                if (orderData) {
                    const mappedOrder: Order = {
                        id: orderData.id,
                        status: orderData.status,
                        totalPrice: orderData.totalPrice,
                        items: orderData.items.map((item: any) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                        })),
                        shippingAddress: {
                            street: orderData.shippingAddress?.street ?? '',
                            city: orderData.shippingAddress?.city ?? '',
                            state: orderData.shippingAddress?.state ?? '',
                            zipCode: orderData.shippingAddress?.zipCode ?? '',
                            country: orderData.shippingAddress?.country ?? '',
                        },
                        estimatedDelivery: orderData.estimatedDelivery,
                    };
                    setOrder(mappedOrder);
                } else {
                    setError('Order not found');
                }
            } catch (err) {
                setError('Failed to load order details');
                console.error('Error fetching order:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
                    <p>{error}</p>
                    <Button className="mt-4" onClick={() => router.push('/dashboard')}>
                        Return Home
                    </Button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p>Order not found</p>
                <Button className="mt-4" onClick={() => router.push('/')}>
                    Return Home
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-2xl mt-20">
            <div className="text-center mb-8">
                <FiCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-600">Thank you for your purchase</p>
                <p className="text-sm text-gray-500 mt-2">Order #{order.id}</p>
            </div>
            <div className="flex justify-center">
                <Button className="mt-4" onClick={() => router.push('/dashboard')}>
                    Return Home
                </Button>
            </div>
        </div>
    );
}
