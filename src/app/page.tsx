/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CountdownTimer, Header, ProductCard } from '@/components';
import {
    FiChevronRight,
    FiZap,
    FiPhone,
    FiMonitor,
    FiShoppingBag,
    FiHome,
    FiHeart,
    FiArrowLeft,
    FiArrowRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
// Hero banner images
const HERO_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop',
        alt: 'Super Deals - Limited Time Offers',
        title: 'Super Deals Week',
        subtitle: 'Up to 70% OFF on selected items'
    },
    {
        src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop',
        alt: 'New Arrivals',
        title: 'New Arrivals',
        subtitle: 'Discover our latest products'
    },
    {
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop',
        alt: 'Tech Gadgets',
        title: 'Tech Gadgets',
        subtitle: 'Cutting-edge technology for you'
    }
];

// Online image URLs
const IMAGES = {
    products: Array(6).fill(0).map((_, i) => ({
        id: i + 1,
        src: `https://picsum.photos/300/300?random=${i + 1}`,
        alt: `Product ${i + 1}`,
        name: `Premium Product ${i + 1}`,
        description: `This is a detailed description of Premium Product ${i + 1}.`,
        price: (i + 1) * 15000,
        originalPrice: (i + 1) * 20000,
        sold: 100 - ((i + 1) * 10),
        image: `https://picsum.photos/300/300?random=${i + 1}`,
        rating: 4.5,
        reviews: 20 + i
    })),
    deals: Array(4).fill(0).map((_, i) => ({
        id: i + 1,
        src: `https://picsum.photos/400/300?random=${i + 10}`,
        alt: `Deal ${i + 1}`,
        name: `Amazing Deal ${i + 1}`,
        description: `This is a detailed description of Amazing Deal ${i + 1}.`,
        price: (i + 1) * 25000,
        originalPrice: (i + 1) * 30000,
        discount: (i + 1) * 15,
        image: `https://picsum.photos/400/300?random=${i + 10}`,
        rating: 4.0 + i * 0.1,
        reviews: 10 + i * 5
    }))
};

const categories = [
    { name: 'Phones', icon: <FiPhone className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-blue-100 text-blue-600' },
    { name: 'Laptops', icon: <FiMonitor className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-purple-100 text-purple-600' },
    { name: 'TVs', icon: <FiMonitor className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-green-100 text-green-600' },
    { name: 'Fashion', icon: <FiShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-pink-100 text-pink-600' },
    { name: 'Home', icon: <FiHome className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Beauty', icon: <FiHeart className="h-5 w-5 sm:h-6 sm:w-6" />, color: 'bg-red-100 text-red-600' },
];

<Header/>

function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    };

    return (
        <div className="relative aspect-video sm:h-64 md:h-80 rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={HERO_IMAGES[currentSlide].src}
                        alt={HERO_IMAGES[currentSlide].alt}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/90 backdrop-blur-sm p-4 rounded-lg max-w-md"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                {HERO_IMAGES[currentSlide].title}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-700 mb-4">
                                {HERO_IMAGES[currentSlide].subtitle}
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-300 transition-all"
                            >
                                <Link href="/products">
                                    Shop Now <FiChevronRight className="ml-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Previous slide"
            >
                <FiArrowLeft className="h-5 w-5" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Next slide"
            >
                <FiArrowRight className="h-5 w-5" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2">
                {HERO_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-4' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            {/* Top Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 text-sm font-medium"
            >
                🚀 Free delivery on orders over ₦50,000 | Shop now!
            </motion.div>

            <main className="container mx-auto px-2 sm:px-4">
                {/* Hero Section */}
                <motion.section
                    className="py-4 sm:py-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Category Sidebar */}
                        <motion.div
                            className="hidden lg:block bg-white lg:w-1/5 p-3 sm:p-4 shadow-sm rounded-lg border border-gray-100"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="font-bold text-lg mb-3 sm:mb-4 text-gray-800">Shop Categories</h3>
                            <ul className="space-y-1 sm:space-y-2">
                                {['Phones', 'Computing', 'Electronics', 'Fashion', 'Home & Office', 'Appliances'].map((category, index) => (
                                    <motion.li
                                        key={category}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <Link
                                            href={`/categories`}
                                            className="hover:bg-gray-50 flex items-center gap-2 text-sm sm:text-base p-2 rounded-md transition-colors text-gray-700 hover:text-red-600"
                                        >
                                            <FiChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                                            {category}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Hero Carousel */}
                        <motion.div
                            className="w-full lg:w-4/5 bg-white p-2 sm:p-4 shadow-sm rounded-lg border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 10 }}
                        >
                            <HeroCarousel />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Flash Sale Section */}
                <motion.section
                    className="bg-white py-4 sm:py-6 shadow-sm border-t border-b border-gray-100 rounded-lg my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="container mx-auto px-2 sm:px-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                            <motion.h2
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                                transition={{ type: 'spring' }}
                                className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-800"
                            >
                                <motion.span
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <FiZap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                                </motion.span>
                                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                                    Flash Sale
                                </span>
                            </motion.h2>
                            <div className="flex items-center gap-2 bg-red-50 px-2 sm:px-3 py-1 rounded-full border border-red-100">
                                <span className="text-red-600 font-medium text-xs sm:text-sm">Ends in:</span>
                                <CountdownTimer initialTime={2 * 60 * 60 + 45 * 60 + 30} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                            {IMAGES.products.map((product, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + index * 0.05 }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <ProductCard
                                        product={product}
                                        showProgress={true}
                                        isFlashSale={true}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Category Deals */}
                <motion.section
                    className="my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100">
                        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Shop By Category</h2>
                        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Link
                                        href={`/category/${category.name.toLowerCase()}`}
                                        className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-all hover:shadow-sm"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 10 }}
                                            className={`${category.color} p-3 sm:p-4 rounded-full mb-1 sm:mb-2`}
                                        >
                                            {category.icon}
                                        </motion.div>
                                        <span className="text-xs sm:text-sm text-center font-medium text-gray-700">
                                            {category.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Daily Deals */}
                <motion.section
                    className="bg-gray-50 py-6 sm:py-8 border-t border-gray-200 my-6 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="container mx-auto px-2 sm:px-4">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Today's Best Deals</h2>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <Link href="/deals">
                                    View All <FiChevronRight className="ml-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {IMAGES.deals.map((deal, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 + index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <ProductCard
                                        product={deal}
                                        showDiscountBadge={true}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}