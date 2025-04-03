'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FiUser, FiShoppingCart, FiSearch, FiX, FiMenu } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedLink from '@/features/home/components/protected-link';

export function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/deals", label: "Deals" },
        { href: "/categories", label: "Categories" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="text-xl font-bold">
                            Shop<span className="text-red-600">Now</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`hover:text-red-600 transition-colors ${pathname === link.href ? 'text-red-600 font-medium' : 'text-gray-700'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <motion.div
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button className="p-2 text-gray-700 hover:text-red-600 hidden sm:block">
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <ProtectedLink href="/login" className="p-2 text-gray-700 hover:text-red-600 relative">
                            <FiShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                0
                            </span>
                        </ProtectedLink>
                        <Button
                            onClick={() => router.push('/login')}
                            variant="outline"
                            className="hidden sm:flex items-center gap-1"
                        >
                            <FiUser className="h-4 w-4" />
                            <span>Login</span>
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            className="p-2 text-gray-700 hover:text-red-600 md:hidden"
                            onClick={toggleMobileMenu}
                        >
                            {mobileMenuOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </motion.div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-2 pb-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'}`}
                                        onClick={closeMobileMenu}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="flex items-center px-3 py-2 space-x-4">
                                    <button className="p-2 text-gray-700 hover:text-red-600">
                                        <FiSearch className="h-5 w-5" />
                                    </button>
                                    <Button
                                        onClick={() => {
                                            router.push('/login');
                                            closeMobileMenu();
                                        }}
                                        variant="outline"
                                        className="flex items-center gap-1"
                                    >
                                        <FiUser className="h-4 w-4" />
                                        <span>Login</span>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Login Modal */}
            <AnimatePresence>
                {showLogin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowLogin(false)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="bg-white rounded-lg p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Login form remains the same */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};