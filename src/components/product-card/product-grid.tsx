'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './product-card';
import { Product } from '@/types';
import { FiLoader } from 'react-icons/fi';

interface ProductGridProps {
    products?: Product[];
    isLoading?: boolean;
}

const additionalProducts: Product[] = [
    {
        id: 9,
        name: 'Bluetooth Speaker Pro',
        price: 12900,
        description: '360° sound with 20hr battery life and waterproof design',
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop',
        rating: 4.5,
        reviews: 187,
        colors: ['Black', 'Blue', 'Red']
    },
    {
        id: 10,
        name: 'Fitness Tracker V3',
        price: 9900,
        description: 'Heart rate monitor, sleep tracking, and 10-day battery',
        image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&auto=format&fit=crop',
        rating: 4.3,
        reviews: 243
    },
    {
        id: 11,
        name: 'External SSD 1TB',
        price: 14900,
        description: 'USB-C with 1050MB/s read speeds and rugged design',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop',
        rating: 4.8,
        reviews: 156,
        storage: ['512GB', '1TB', '2TB']
    },
    {
        id: 12,
        name: 'Mechanical Keyboard',
        price: 8900,
        description: 'RGB backlit with cherry MX switches and aluminum frame',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop',
        rating: 4.7,
        reviews: 98,
        colors: ['Black', 'White']
    },
    {
        id: 13,
        name: 'Wireless Charging Pad',
        price: 3900,
        description: '15W fast charging for Qi-enabled devices',
        image: 'https://images.unsplash.com/photo-1587033411394-4b47bc15e8a9?w=800&auto=format&fit=crop',
        rating: 4.2,
        reviews: 76
    },
    {
        id: 14,
        name: '4K Action Camera',
        price: 24900,
        description: 'Waterproof with image stabilization and 4K/60fps',
        image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop',
        rating: 4.6,
        reviews: 132
    },
    {
        id: 15,
        name: 'Noise Cancelling Earbuds',
        price: 17900,
        description: 'True wireless with 30hr battery and ANC',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop',
        rating: 4.4,
        reviews: 201
    },
    {
        id: 16,
        name: 'Ergonomic Office Chair',
        price: 29900,
        description: 'Adjustable lumbar support and breathable mesh',
        image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&auto=format&fit=crop',
        rating: 4.9,
        reviews: 87
    }
];

export function ProductGrid({ products = [], isLoading = false }: ProductGridProps) {
    // Combine passed products with additional sample products
    const allProducts = [...products, ...additionalProducts];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="animate-spin text-2xl text-gray-500" />
            </div>
        );
    }

    if (allProducts.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {allProducts.map((product) => (
                <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    layout
                >
                    <ProductCard
                        product={{
                            ...product,
                            rating: product.rating ?? 0,
                            reviews: product.reviews ?? 0,
                            discount: product.discount ?? 0,
                            inStock: product.inStock ?? true
                        }}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}