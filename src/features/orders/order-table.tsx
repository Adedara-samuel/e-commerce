/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FiClock, FiCheckCircle, FiTruck, FiChevronRight, FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface Order {
    id?: string;
    customer?: string;
    date?: string;
    amount?: string;
    status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    items?: number;
    onRowClick?: (order: any) => void;
}

export function OrderTable({ onRowClick, ...props }: Order) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Sample order data
    const orders: Order[] = [
        { id: 'ORD-7841', customer: 'Alex Johnson', date: '2023-07-15', amount: '$129.99', status: 'shipped', items: 3 },
        { id: 'ORD-7840', customer: 'Sarah Williams', date: '2023-07-14', amount: '$89.99', status: 'delivered', items: 2 },
        { id: 'ORD-7839', customer: 'Michael Brown', date: '2023-07-14', amount: '$249.99', status: 'pending', items: 5 },
        { id: 'ORD-7838', customer: 'Emily Davis', date: '2023-07-13', amount: '$179.99', status: 'shipped', items: 1 },
        { id: 'ORD-7837', customer: 'David Wilson', date: '2023-07-12', amount: '$59.99', status: 'delivered', items: 2 },
        { id: 'ORD-7836', customer: 'Jessica Lee', date: '2023-07-11', amount: '$199.99', status: 'cancelled', items: 4 },
        { id: 'ORD-7835', customer: 'Robert Garcia', date: '2023-07-10', amount: '$149.99', status: 'delivered', items: 3 },
        { id: 'ORD-7834', customer: 'Olivia Martinez', date: '2023-07-09', amount: '$79.99', status: 'shipped', items: 1 },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <FiClock className="text-yellow-500" />;
            case 'shipped': return <FiTruck className="text-blue-500" />;
            case 'delivered': return <FiCheckCircle className="text-green-500" />;
            case 'cancelled': return <FiCheckCircle className="text-gray-500" />;
            default: return <FiClock className="text-gray-500" />;
        }
    };

    const statusClasses = {
        pending: 'bg-yellow-50 text-yellow-800',
        shipped: 'bg-blue-50 text-blue-800',
        delivered: 'bg-green-50 text-green-800',
        cancelled: 'bg-gray-50 text-gray-800'
    };

    const handleRowClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDrawerOpen(true);
        if (onRowClick) onRowClick(order);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className="relative">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Table Filters */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-64">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search orders..."
                                className="pl-10"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest first</SelectItem>
                                    <SelectItem value="oldest">Oldest first</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <motion.tr
                                    key={order.id}
                                    whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                                    className="cursor-pointer"
                                    onClick={() => handleRowClick(order)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.items} item{order.items !== 1 ? 's' : ''}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[order.status || 'pending']}`}>
                                            {getStatusIcon(order.status || 'pending')}
                                            <span className="ml-1 capitalize">{order.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRowClick(order);
                                            }}
                                        >
                                            View <FiChevronRight className="ml-1" />
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                        <span className="font-medium">24</span> orders
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm">
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Order Details Drawer */}
            {isDrawerOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-lg z-50 border-l border-gray-200"
                >
                    <div className="h-full overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Order Details</h2>
                            <button
                                onClick={closeDrawer}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {selectedOrder && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Order #{selectedOrder.id}</h3>
                                    <p className="text-sm text-gray-500">Placed on {selectedOrder.date}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Customer</span>
                                        <span>{selectedOrder.customer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Items</span>
                                        <span>{selectedOrder.items} item{selectedOrder.items !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total Amount</span>
                                        <span className="font-medium">{selectedOrder.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Status</span>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[selectedOrder.status || 'pending']}`}>
                                            {getStatusIcon(selectedOrder.status || 'pending')}
                                            <span className="ml-1 capitalize">{selectedOrder.status}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-medium mb-3">Order Items</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">Product Name</p>
                                                <p className="text-sm text-gray-500">Qty: 1</p>
                                            </div>
                                            <p className="font-medium">$29.99</p>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                                <p className="font-medium">Another Product</p>
                                                <p className="text-sm text-gray-500">Qty: 2</p>
                                            </div>
                                            <p className="font-medium">$99.98</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-medium mb-3">Shipping Information</h4>
                                    <div className="space-y-2 text-sm">
                                        <p>123 Main St, Apt 4B</p>
                                        <p>New York, NY 10001</p>
                                        <p>United States</p>
                                        <p className="text-gray-500">Estimated delivery: July 20, 2023</p>
                                    </div>
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <Button variant="outline" className="flex-1" onClick={closeDrawer}>
                                        Close
                                    </Button>
                                    <Button className="flex-1">
                                        Print Invoice
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Glassmorphism Overlay */}
            {isDrawerOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={closeDrawer}
                >
                    <div className="absolute inset-0 bg-red-200/40 backdrop-blur-sm backdrop-filter" />
                </motion.div>
            )}
        </div>
    );
}