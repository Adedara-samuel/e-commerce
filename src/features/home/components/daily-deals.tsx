/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FiChevronRight } from 'react-icons/fi';
import { ProductCard } from '@/components';

const deals = Array(4).fill(0).map((_, i) => ({
    src: `https://picsum.photos/400/300?random=${i + 10}`,
    alt: `Deal ${i + 1}`,
    name: `Amazing Deal ${i + 1}`,
    price: (i + 1) * 25000,
    originalPrice: (i + 1) * 30000,
    discount: (i + 1) * 15
}));

export function DailyDeals() {
    return (
        <motion.section
            className="bg-gray-50 py-6 sm:py-8 border-t border-gray-200 my-6 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
        >
            {/* Daily deals content */}
        </motion.section>
    );
}