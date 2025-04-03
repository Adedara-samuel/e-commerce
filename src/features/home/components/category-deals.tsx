/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiPhone, FiMonitor, FiShoppingBag, FiHome, FiHeart } from 'react-icons/fi';

const categories = [
    { name: 'Phones', icon: <FiPhone className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-blue-100 text-blue-600' },
    // Other categories...
];

export function CategoryDeals() {
    return (
        <motion.section
            className="my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
        >
            {/* Categories content */}
        </motion.section>
    );
}