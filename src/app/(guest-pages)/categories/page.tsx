'use client';

import { PageHeader } from '@/components/';
import { ProductGrid } from '@/components/';
import { categories } from '@/data/categories';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
    const router = useRouter();

    return (
        <main className="container mx-auto px-2 sm:px-4 py-6">
            <PageHeader
                title="Shop by Category"
                currentPage="Categories"
            />

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Browse Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => router.push('/login')}
                        >
                            <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                                {/* Placeholder for category image */}
                                <span className="text-gray-500">Image</span>
                            </div>
                            <h3 className="font-medium text-center">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Products</h2>
                <ProductGrid products={categories[0].products.slice(0, 4)} />
            </div>
        </main>
    );
}