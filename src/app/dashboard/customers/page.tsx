/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components';
import { CustomerDrawer, CustomerTable } from '@/features/customer';

export default function CustomersPage() {
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (customer: any) => {
        setSelectedCustomer(customer);
        setIsDrawerOpen(true);
    };

    return (
        <>
            <PageHeader
                title="Customers"
                description="Manage your customer database"
                actions={[
                    { label: 'Export Customers', onClick: () => { } }
                ]}
            />

            <CustomerTable onRowClick={handleRowClick} />

            <CustomerDrawer
                customer={selectedCustomer}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}