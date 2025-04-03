/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { PageHeader } from '@/components/';
import { ProductGrid } from '@/components/';
import { deals } from '@/data/deals';
import { useRouter } from 'next/navigation';

export default function DealsPage() {
    const router = useRouter();

    // Filter products with special deals
    const dealProducts = deals.filter(product => product.discount !== undefined && product.discount > 0);

    return (
        <main className="container mx-auto px-2 sm:px-4 py-6">
            <PageHeader
                title="Hot Deals"
                currentPage="Deals"
            />

            <div className="mb-6 bg-red-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-red-600 mb-2">Limited Time Offers</h2>
                <p className="text-gray-700">Don't miss out on these exclusive deals!</p>
            </div>

            <ProductGrid products={dealProducts} />
        </main>
    );
}