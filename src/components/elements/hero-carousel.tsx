/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FiChevronRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop',
        alt: 'Super Deals - Limited Time Offers',
        title: 'Super Deals Week',
        subtitle: 'Up to 70% OFF on selected items'
    },
    // Add other images...
];

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Category Sidebar */}
            <motion.div
                className="hidden lg:block bg-white lg:w-1/5 p-3 sm:p-4 shadow-sm rounded-lg border border-gray-100"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {/* Sidebar content */}
            </motion.div>

            {/* Carousel */}
            <motion.div
                className="w-full lg:w-4/5 bg-white p-2 sm:p-4 shadow-sm rounded-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {/* Carousel implementation */}
            </motion.div>
        </div>
    );
}