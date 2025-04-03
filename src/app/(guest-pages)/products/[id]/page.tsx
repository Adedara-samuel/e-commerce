'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronRight, FiArrowLeft, FiShoppingCart, FiHeart } from 'react-icons/fi';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    colors?: string[];
    storage?: string[];
    discount?: number;
    inStock?: boolean;
    features?: string[];
    specifications?: Record<string, string>;
}

const product: Product = {
    id: 1,
    name: 'Premium Smartphone X1',
    price: 899.99,
    description: 'Flagship model with 108MP camera and 8K video recording. Features a 6.7" AMOLED display, 12GB RAM, and 512GB storage.',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
    rating: 4.7,
    reviews: 342,
    colors: ['Midnight Black', 'Pearl White', 'Ocean Blue'],
    inStock: true,
    features: [
        '6.7" AMOLED 120Hz display',
        '108MP triple camera system',
        '8K video recording',
        '5000mAh battery with fast charging',
        'IP68 water and dust resistance'
    ],
    specifications: {
        'Display': '6.7" AMOLED, 120Hz',
        'Processor': 'Snapdragon 8 Gen 2',
        'Memory': '12GB RAM',
        'Storage': '512GB',
        'Battery': '5000mAh',
        'OS': 'Android 13'
    }
};

export default function ProductPage() {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const token = getCookie('auth-token');
        setIsAuthenticated(!!token);
    }, []);

    const handleAuthAction = (e: React.MouseEvent, action: () => void) => {
        e.preventDefault();
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            action();
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        handleAuthAction(e, () => {
            const cartItem = {
                id: product.id.toString(),
                name: product.name,
                price: product.price,
                image: product.image
            };
            addItem(cartItem);
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        handleAuthAction(e, () => {
            setIsWishlisted(!isWishlisted);
        });
    };

    return (
        <main className="container mx-auto px-2 sm:px-4 py-6 max-w-6xl">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        className="hover:bg-gray-100 text-gray-700"
                        onClick={() => router.back()}
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Products
                    </Button>
                    <h1 className="text-2xl font-bold ml-4 text-gray-800">Product Details</h1>
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Link href="/" className="hover:text-red-600">Home</Link>
                    <FiChevronRight className="mx-2" />
                    <Link href="/products" className="hover:text-red-600">Products</Link>
                    <FiChevronRight className="mx-2" />
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </div>
            </motion.div>

            {/* Product Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                    {/* Product Image */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
                            onClick={handleWishlist}
                        >
                            <FiHeart className={`${isWishlisted ? 'text-red-600 fill-red-600' : 'text-gray-600'} hover:text-red-600`} />
                        </Button>
                    </motion.div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                                {product.discount && (
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                    </span>
                                )}
                                {product.inStock ? (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded ml-4">
                                        In Stock
                                    </span>
                                ) : (
                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded ml-4">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600">{product.description}</p>

                            {/* Color Options */}
                            {product.colors && (
                                <div className="pt-2">
                                    <h3 className="text-sm font-medium text-gray-800">Colors</h3>
                                    <div className="flex space-x-2 mt-2">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                style={{
                                                    backgroundColor: color.includes('Black') ? '#111827' :
                                                        color.includes('White') ? '#f3f4f6' :
                                                            color.includes('Blue') ? '#3b82f6' : '#f3f4f6'
                                                }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                >
                                    <FiShoppingCart className="mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="border-t border-gray-200 pt-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features?.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Specifications */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="border-t border-gray-200 pt-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">{key}</div>
                                        <div className="font-medium text-gray-800">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}