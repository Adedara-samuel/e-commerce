'use client';

import { FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export function RecentOrders() {
    const router = useRouter();
    const orders = [
        { id: '#ORD-7841', customer: 'Alex Johnson', date: '2023-07-15', amount: '$129.99', status: 'shipped' },
        { id: '#ORD-7840', customer: 'Sarah Williams', date: '2023-07-14', amount: '$89.99', status: 'delivered' },
        { id: '#ORD-7839', customer: 'Michael Brown', date: '2023-07-14', amount: '$249.99', status: 'pending' },
        { id: '#ORD-7838', customer: 'Emily Davis', date: '2023-07-13', amount: '$179.99', status: 'shipped' },
        { id: '#ORD-7837', customer: 'David Wilson', date: '2023-07-12', amount: '$59.99', status: 'delivered' }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <FiClock className="text-yellow-500" />;
            case 'shipped': return <FiTruck className="text-blue-500" />;
            case 'delivered': return <FiCheckCircle className="text-green-500" />;
            default: return <FiClock className="text-gray-500" />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/dashboard/orders/${order.id.slice(1)}`)}
                            >
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{order.customer}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{order.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        {getStatusIcon(order.status)}
                                        <span className="ml-2 capitalize">{order.status}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => router.push('/dashboard/orders')}
                className="mt-4 text-sm text-red-600 hover:underline"
            >
                View all orders
            </button>
        </div>
    );
}