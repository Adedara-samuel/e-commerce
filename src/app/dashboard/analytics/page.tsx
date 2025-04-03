'use client';

import { PageHeader } from '@/components';
import { SalesChart, RevenueChart, CustomerChart } from '@/features/analytics';

export default function AnalyticsPage() {
    return (
        <>
            <PageHeader
                title="Analytics"
                description="Track your store performance"
                actions={[
                    { label: 'Export Report', onClick: () => { } }
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-xs">
                    <h3 className="font-medium mb-4">Sales Overview</h3>
                    <SalesChart />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-xs">
                    <h3 className="font-medium mb-4">Revenue</h3>
                    <RevenueChart />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-xs lg:col-span-2">
                    <h3 className="font-medium mb-4">Customer Acquisition</h3>
                    <CustomerChart />
                </div>
            </div>
        </>
    );
}