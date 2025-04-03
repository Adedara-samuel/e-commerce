/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components';
import { OrderDrawer, OrderTable } from '@/features/orders';

// Sample order data type - replace with your actual type
interface Order {
    id: string;
    customer: string;
    date: string;
    status: string;
    email?: string;
    phone?: string;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: string;
    }[];
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
}

export default function OrdersPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (order: Order) => {
        setIsDrawerOpen(true);
    };

    const handleExport = () => {
        // Your existing export logic
        console.log('Exporting orders...');
    };

    return (
        <>
            <PageHeader
                title="Orders"
                description="View and manage customer orders"
                actions={[
                    { label: 'Export', onClick: handleExport }
                ]}
            />

            {/* Modified OrderTable with row click handler */}
            <OrderTable onRowClick={handleRowClick} />

            {/* Order Details Drawer
            <OrderDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(true)} order={undefined}            /> */}
        </>
    );
}