'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavMenu() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center space-x-6">
            {['Home', 'Products', 'Deals', 'Categories'].map((item, index) => (
                <Link key={index} href={`/${item.toLowerCase()}`} className={`hover:text-red-600 transition-colors ${pathname === `/${item.toLowerCase()}` ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                    {item}
                </Link>
            ))}
        </nav>
    );
}
