/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';


import { useCartStore } from '@/stores/cart-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiBell, FiAtSign } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { NewProductForm } from '@/components';
import { useState } from 'react';
import { ChevronDownIcon, LogOut, LogOutIcon, PowerOffIcon, User, User2Icon } from 'lucide-react';
import router from 'next/router';
import { deleteCookie } from 'cookies-next';

const navItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Products', href: '/dashboard/products' },
    { name: 'Orders', href: '/dashboard/order' },
    { name: 'Customers', href: '/dashboard/customers' },
    { name: 'Analytics', href: '/dashboard/analytics' },
];

export function DashboardNav() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const totalItems = useCartStore((state) => state.totalItems());

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        deleteCookie('auth-token');
        deleteCookie('user-id');
        localStorage.removeItem('authState');
        sessionStorage.removeItem('sessionData');
        // router.push('/login');
        window.location.reload();
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b">
            {/* Mobile Menu Button */}
            <div className="flex w-full md:hidden items-center justify-between p-3">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-gray-500 hover:text-red-600"
                >
                    {mobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                </button>

                <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-500 hover:text-red-600 transition-colors relative">
                        <FiBell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
                    </button>

                    <Link href="/cart" className="relative p-2 text-gray-500 hover:text-red-600">
                        <FiShoppingCart className="h-5 w-5" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                New Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Fill out the form to add a new product to your store.
                                </DialogDescription>
                            </DialogHeader>
                            <NewProductForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Navigation - Hidden on mobile unless menu is open */}
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
                <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 p-3 md:p-0 md:py-3 overflow-x-auto hide-scrollbar">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`relative whitespace-nowrap py-1.5 px-1 font-medium text-sm transition-colors ${pathname === item.href
                                ? 'text-red-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="navUnderline"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Desktop Actions - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4 pr-4">
                <button className="p-2 text-gray-500 hover:text-red-600 transition-colors relative">
                    <FiBell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
                </button>

                <Link href="/cart" className="relative p-2 text-gray-500 hover:text-red-600 transition-colors">
                    <FiShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>
                                Fill out the form to add a new product to your store.
                            </DialogDescription>
                        </DialogHeader>
                        <NewProductForm />
                    </DialogContent>
                </Dialog>
                    <LogOutIcon className="h-5 w-5 -mr-13" onClick={handleLogout} />
            </div>
        </div>
    );
}