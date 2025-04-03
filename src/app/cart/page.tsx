'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const router = useRouter();
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCartStore();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on client side
        const token = getCookie('auth-token');
        setIsAuthenticated(!!token);
    }, []);

    const handleAuthAction = (action: () => void) => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            action();
        }
    };

    const handleQuantityChange = (id: string, newQuantity: number) => {
        handleAuthAction(() => {
            updateQuantity(id, newQuantity);
        });
    };

    const handleRemoveItem = (id: string) => {
        handleAuthAction(() => {
            removeItem(id);
        });
    };

    const handleCheckout = () => {
        handleAuthAction(() => {
            router.push('/checkout');
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <FiArrowLeft className="mr-2" />
                    Continue Shopping
                </Button>
                <h1 className="text-2xl font-bold ml-4">Your Cart ({totalItems()})</h1>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Link href="/dashboard/products">
                        <Button className="mt-4" variant="outline">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm divide-y">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-16 w-16 min-w-[64px]">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                                        <div className="flex items-center border rounded">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FiMinus className="h-3 w-3" />
                                            </Button>
                                            <span className="px-2 min-w-[30px] text-center">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            >
                                                <FiPlus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600"
                                        >
                                            <FiTrash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4">
                            <Button
                                variant="outline"
                                onClick={() => handleAuthAction(clearCart)}
                            >
                                Clear Cart
                            </Button>
                            <Link href="/dashboard/products">
                                <Button variant="outline">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4">
                        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal ({totalItems()} items)</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between border-t pt-3 font-medium">
                                <span>Total</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            className="w-full mt-6 bg-red-600 hover:bg-red-700"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}