'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { ProductCard } from '@/components';

const products = [
    {
        id: 1,
        name: 'Premium Smartphone X1',
        price: 89900,
        description: 'Flagship model with 108MP camera and 8K video recording',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop',
        rating: 4.7,
        reviews: 342,
        colors: ['Midnight Black', 'Pearl White', 'Ocean Blue']
    },
    {
        id: 2,
        name: 'Ultra Slim Laptop Pro',
        price: 129900,
        description: '14" 4K display, 16GB RAM, 1TB SSD, 12hr battery life',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
        rating: 4.8,
        reviews: 287,
        storage: ['512GB', '1TB', '2TB']
    },
    {
        id: 3,
        name: 'Wireless Noise-Canceling Headphones',
        price: 45900,
        description: '40hr battery life with premium sound quality and ANC',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
        rating: 4.6,
        reviews: 156
    },
    {
        id: 4,
        name: '4K Smart TV 55"',
        price: 189900,
        description: 'QLED display with HDR10+ and built-in streaming apps',
        image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=800&auto=format&fit=crop',
        rating: 4.9,
        reviews: 421
    },
    {
        id: 5,
        name: 'Smart Watch Series 5',
        price: 32900,
        description: 'Health monitoring, GPS, and 7-day battery life',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
        rating: 4.4,
        reviews: 198,
        colors: ['Black', 'Silver', 'Rose Gold']
    },
    {
        id: 6,
        name: 'Professional DSLR Camera',
        price: 149900,
        description: '24.2MP sensor with 4K video and 5-axis stabilization',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop',
        rating: 4.9,
        reviews: 312
    },
    {
        id: 7,
        name: 'Gaming Console Pro',
        price: 99900,
        description: 'Next-gen gaming with 4K/120fps support and 1TB storage',
        image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop',
        rating: 4.8,
        reviews: 534
    },
    {
        id: 8,
        name: 'Wireless Earbuds Pro',
        price: 28900,
        description: 'Active noise cancellation with spatial audio support',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop',
        rating: 4.5,
        reviews: 276
    }
];

export default function ProductsPage() {
    return (
        <main className="container mx-auto px-2 sm:px-4 py-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Link href="/" className="hover:text-red-600">Home</Link>
                    <FiChevronRight className="mx-2" />
                    <span>Products</span>
                </div>
            </motion.div>

            {/* Product Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
}