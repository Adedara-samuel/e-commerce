/* eslint-disable @next/next/no-img-element */
'use client';

import { FiStar, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function TopProducts() {
    const router = useRouter();
    const products = [
        {
            id: 1,
            name: 'Premium Smartphone X1',
            sales: 142,
            revenue: 12780,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'Wireless Earbuds Pro',
            sales: 98,
            revenue: 5670,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop'
        },
        {
            id: 3,
            name: 'Smart Watch Series 5',
            sales: 76,
            revenue: 4320,
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop'
        },
        {
            id: 4,
            name: '4K Action Camera',
            sales: 65,
            revenue: 8920,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop'
        },
        {
            id: 5,
            name: 'Mechanical Keyboard',
            sales: 54,
            revenue: 3120,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Top Products</h3>
                <select className="bg-gray-100 text-sm rounded px-3 py-1">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => router.push(`/dashboard/products/${product.id}`)}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                            <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">{product.name}</h4>
                                <div className="flex items-center text-sm text-gray-500">
                                    <FiStar className="text-yellow-400 mr-1" />
                                    <span>{product.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">${(product.revenue / 100).toFixed(2)}</p>
                            <div className="flex items-center justify-end text-sm text-green-600">
                                <FiTrendingUp className="mr-1" />
                                <span>{product.sales} sold</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => router.push('/dashboard/products')}
                className="mt-4 w-full flex items-center justify-center text-sm text-red-600 hover:underline"
            >
                View all products <FiChevronRight className="ml-1" />
            </button>
        </div>
    );
}