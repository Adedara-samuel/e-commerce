/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { FiBox, FiDollarSign, FiUsers, FiShoppingCart, FiStar, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import { Card, LineChart, BarChart, RecentOrders, TopProducts } from '@/features/dashboard';
import { useRouter } from 'next/navigation';
import { SettingsIcon } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();

    // Sample data
    const stats = [
        { title: "Total Revenue", value: "$24,780", change: "+12%", icon: <FiDollarSign /> },
        { title: "Total Orders", value: "1,842", change: "+8%", icon: <FiShoppingCart /> },
        { title: "Products", value: "356", change: "+5%", icon: <FiBox /> },
        { title: "Customers", value: "1,254", change: "+18%", icon: <FiUsers /> }
    ];

    const salesData = [
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 5000 },
        { month: 'Apr', sales: 2780 },
        { month: 'May', sales: 1890 },
        { month: 'Jun', sales: 2390 },
        { month: 'Jul', sales: 3490 }
    ];

    const revenueData = [
        { month: 'Jan', revenue: 2400 },
        { month: 'Feb', revenue: 1398 },
        { month: 'Mar', revenue: 9800 },
        { month: 'Apr', revenue: 3908 },
        { month: 'May', revenue: 4800 },
        { month: 'Jun', revenue: 3800 },
        { month: 'Jul', revenue: 4300 }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2"
                    >
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    </motion.div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/dashboard/settings')}
                            className="text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <SettingsIcon className="h-6 w-6" />
                        </button>
                        {/* <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                            New Product
                        </button> */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    {stats.map((stat, index) => (
                        <Card key={index} {...stat} />
                    ))}
                </motion.div>

                {/* Charts Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                >
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Sales Overview</h3>
                            <select className="bg-gray-100 text-sm rounded px-3 py-1">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                        </div>
                        <LineChart data={salesData} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Revenue</h3>
                            <select className="bg-gray-100 text-sm rounded px-3 py-1">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                        </div>
                        <BarChart data={revenueData} />
                    </div>
                </motion.div>

                {/* Bottom Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <RecentOrders />
                    <TopProducts />
                </motion.div>

                {/* Alerts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                >
                    <div className="flex items-start">
                        <FiAlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                        <div>
                            <p className="font-medium text-yellow-800">Action Required</p>
                            <p className="text-sm text-yellow-700">
                                5 pending orders need your approval. <button className="font-semibold hover:underline">Review now</button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}