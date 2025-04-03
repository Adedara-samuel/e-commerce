'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const HERO_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop', alt: 'Super Deals', title: 'Super Deals Week', subtitle: 'Up to 70% OFF' },
    { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop', alt: 'New Arrivals', title: 'New Arrivals', subtitle: 'Discover latest products' },
    { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop', alt: 'Tech Gadgets', title: 'Tech Gadgets', subtitle: 'Cutting-edge technology' }
];

export function HeroBanner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <Image src={HERO_IMAGES[index].src} alt={HERO_IMAGES[index].alt} layout="fill" objectFit="cover" className="transition-opacity duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center">
                <h2 className="text-3xl font-bold">{HERO_IMAGES[index].title}</h2>
                <p className="text-lg">{HERO_IMAGES[index].subtitle}</p>
            </div>
            <button onClick={() => setIndex((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1))} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"><FiArrowLeft /></button>
            <button onClick={() => setIndex((prev) => (prev + 1) % HERO_IMAGES.length)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"><FiArrowRight /></button>
        </div>
    );
}
