'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

interface BreadcrumbProps {
    currentPage: string;
}

export function Breadcrumb({ currentPage }: BreadcrumbProps) {
    return (
        <div className="flex items-center text-sm text-gray-600 mt-2">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <FiChevronRight className="mx-2" />
            <span>{currentPage}</span>
        </div>
    );
}