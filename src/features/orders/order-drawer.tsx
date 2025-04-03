/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { FiX, FiPrinter, FiDownload } from 'react-icons/fi';

interface OrderDrawerProps {
    order: any;
    open: boolean;
    onClose: () => void;
}

export function OrderDrawer({ order, open, onClose }: OrderDrawerProps) {
    if (!order) return null;

    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContent className="max-h-[90vh]">
                <div className="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <DrawerTitle>Order #{order.id}</DrawerTitle>
                                <DrawerDescription>
                                    {new Date(order.date).toLocaleDateString()} • {order.status}
                                </DrawerDescription>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <FiX className="h-4 w-4" />
                            </Button>
                        </div>
                    </DrawerHeader>

                    <div className="p-6 space-y-6">
                        {/* Customer Info */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Customer</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p>{order.customer}</p>
                                <p className="text-sm text-gray-500">{order.email}</p>
                                <p className="text-sm text-gray-500">{order.phone}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Items ({order.items.length})</h3>
                            <div className="border rounded-lg divide-y">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="p-4 flex justify-between">
                                        <div>
                                            <p>{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p>${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-2">
                            <h3 className="font-medium">Summary</h3>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${order.shipping}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${order.tax}</span>
                                </div>
                                <div className="flex justify-between font-medium pt-2 border-t">
                                    <span>Total</span>
                                    <span>${order.total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-4">
                            <Button variant="outline" className="flex-1">
                                <FiPrinter className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <FiDownload className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}