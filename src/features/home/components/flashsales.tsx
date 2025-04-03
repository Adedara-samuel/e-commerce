/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { motion } from 'framer-motion'

const products = Array(6).fill(0).map((_, i) => ({
    src: `https://picsum.photos/300/300?random=${i + 1}`,
    alt: `Product ${i + 1}`,
    name: `Premium Product ${i + 1}`,
    price: (i + 1) * 15000,
    originalPrice: (i + 1) * 20000,
    sold: 100 - ((i + 1) * 10)
}));

export function FlashSale() {
    return (
        <motion.section
            className="bg-white py-4 sm:py-6 shadow-sm border-t border-b border-gray-100 rounded-lg my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <div className="container mx-auto px-2 sm:px-4">
                {/* Flash sale content */}
            </div>
        </motion.section>
    );
}