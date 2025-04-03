'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import Link from 'next/link';
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
}

interface ProductCardProps {
    product: Product;
    showProgress?: boolean;
    isFlashSale?: boolean;
    showDiscountBadge?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status on client side
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
            addItem(cartItem);
        });
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        handleAuthAction(e, () => {
            router.push(`/products/${product.id}`);
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        handleAuthAction(e, () => {
            // Add to wishlist logic here
            console.log('Added to wishlist');
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
                    onClick={handleWishlist}
                >
                    <FiHeart className="text-gray-600 hover:text-red-600" />
                </Button>
            </div>

            <div className="p-4">
                <Link href={`/products/${product.id}`} onClick={(e) => handleViewDetails(e)}>
                    <h3 className="font-semibold text-lg text-gray-800 hover:text-red-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center mt-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                        {product.discount && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>
                    {product.inStock ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            In Stock
                        </span>
                    ) : (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            Out of Stock
                        </span>
                    )}
                </div>

                <div className="mt-6 flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => handleViewDetails(e)}
                    >
                        View Details
                    </Button>
                    <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={(e) => handleAddToCart(e)}
                        disabled={!product.inStock}
                    >
                        <FiShoppingCart className="mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}