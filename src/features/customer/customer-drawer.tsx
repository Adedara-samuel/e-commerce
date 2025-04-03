/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { FiX, FiMail, FiPhone, FiShoppingBag } from 'react-icons/fi';

export function CustomerDrawer({ customer, open, onClose }: any) {
    if (!customer) return null;

    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContent className="max-h-[90vh]">
                <div className="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <DrawerTitle>{customer.name}</DrawerTitle>
                                <p className="text-sm text-gray-500">Customer since {new Date(customer.joinDate).toLocaleDateString()}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <FiX className="h-4 w-4" />
                            </Button>
                        </div>
                    </DrawerHeader>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h3 className="font-medium">Contact Information</h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <FiMail className="text-gray-400" />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiPhone className="text-gray-400" />
                                        <span>{customer.phone || 'Not provided'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium">Customer Stats</h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total Orders</span>
                                        <span>{customer.totalOrders}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Spent</span>
                                        <span>${customer.totalSpent}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Last Order</span>
                                        <span>{customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium">Recent Orders</h3>
                            <div className="border rounded-lg divide-y">
                                {customer.recentOrders?.map((order: any) => (
                                    <div key={order.id} className="p-3 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p>${order.total}</p>
                                            <p className={`text-xs ${order.status === 'delivered' ? 'text-green-600' :
                                                    order.status === 'shipped' ? 'text-blue-600' :
                                                        'text-yellow-600'
                                                }`}>
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}