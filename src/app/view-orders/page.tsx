/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { OrderService } from '@/services/orderservice';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
import { useEffect, useState } from 'react';

interface Order {
    id: string;
    items: any[];
    totalPrice: number;
    createdAt: Date;
}

export default function OrdersPage() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (session?.user) {
            OrderService.getOrders(session.user.id).then(setOrders);
        }
    }, [session]);

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.map((order) => (
                <div key={order.id} className="border p-4 mb-4">
                    <p>Order #{order.id}</p>
                    <p>Total: ${order.totalPrice.toFixed(2)}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}