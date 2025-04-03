import { DashboardNav } from '@/features/dashboard';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="bg-white shadow-xs sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                        <Link href="/" className="text-xl font-bold">
                            Shop<span className="text-red-600">Now</span>
                        </Link>
                        </div>
                    </div>
                    <DashboardNav />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-xs p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}