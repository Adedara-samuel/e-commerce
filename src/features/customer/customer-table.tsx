'use client';

import { motion } from 'framer-motion';
import { FiChevronRight, FiMail, FiPhone, FiShoppingBag } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    orders: number;
    totalSpent: number;
    lastOrder: string;
}

interface CustomerTableProps {
    customers?: Customer[];
    onRowClick?: (customer: Customer) => void;
}

export function CustomerTable({ customers = [], onRowClick }: CustomerTableProps) {
    // Sample customer data
    const customerData: Customer[] = customers.length > 0 ? customers : [
        {
            id: '1',
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            phone: '(555) 123-4567',
            orders: 12,
            totalSpent: 2895.99,
            lastOrder: '2023-07-15'
        },
        {
            id: '2',
            name: 'Sarah Williams',
            email: 'sarah.w@example.com',
            phone: '(555) 987-6543',
            orders: 8,
            totalSpent: 1420.50,
            lastOrder: '2023-07-10'
        },
        {
            id: '3',
            name: 'Michael Brown',
            email: 'michael.b@example.com',
            phone: '(555) 456-7890',
            orders: 5,
            totalSpent: 875.25,
            lastOrder: '2023-06-28'
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Orders
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Spent
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Order
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customerData.map((customer) => (
                            <motion.tr
                                key={customer.id}
                                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                                className="cursor-pointer"
                            >
                                <td
                                    className="px-6 py-4 whitespace-nowrap"
                                    onClick={() => onRowClick?.(customer)}
                                >
                                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <FiMail className="text-gray-400 h-4 w-4" />
                                        <span className="text-sm text-gray-500">{customer.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <FiPhone className="text-gray-400 h-4 w-4" />
                                        <span className="text-sm text-gray-500">{customer.phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FiShoppingBag className="text-gray-400 h-4 w-4 mr-1" />
                                        <span className="text-sm text-gray-900">{customer.orders}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${customer.totalSpent.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(customer.lastOrder).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onRowClick?.(customer)}
                                    >
                                        View <FiChevronRight className="ml-1" />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}