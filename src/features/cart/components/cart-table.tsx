/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { FiTrash2, FiChevronRight } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
    sku: string;
}

interface CartTableProps {
    items?: CartItem[];
    onRowClick?: (item: CartItem) => void;
}

export function CartTable({ items = [], onRowClick }: CartTableProps) {
    // Sample cart data
    const cartItems: CartItem[] = items.length > 0 ? items : [
        {
            id: '1',
            name: 'Premium Smartphone X1',
            image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
            price: 899.99,
            quantity: 1,
            stock: 15,
            sku: 'PSX1-BLK'
        },
        {
            id: '2',
            name: 'Wireless Earbuds Pro',
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop',
            price: 129.99,
            quantity: 2,
            stock: 42,
            sku: 'WEBP-BLK'
        },
        {
            id: '3',
            name: 'Smart Watch Series 5',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
            price: 249.99,
            quantity: 1,
            stock: 8,
            sku: 'SWS5-SLV'
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <motion.tr
                                key={item.id}
                                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                                className="cursor-pointer"
                            >
                                <td className="px-6 py-4 whitespace-nowrap" onClick={() => onRowClick?.(item)}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-md object-cover" src={item.image} alt={item.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${item.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            -
                                        </Button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            +
                                        </Button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium">Order Summary</h3>
                        <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-medium">${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                        <Button className="mt-4 w-full bg-red-600 hover:bg-red-700">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}