/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export function CartDrawer({ item, open, onClose }: any) {
    if (!item) return null;

    return (
        <Drawer open={open} onClose={onClose}>
            <DrawerContent className="max-h-[90vh]">
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <DrawerTitle>{item.name}</DrawerTitle>
                                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <FiX className="h-4 w-4" />
                            </Button>
                        </div>
                    </DrawerHeader>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">${item.price}</p>
                                <p className="text-sm text-gray-500">In stock: {item.stock}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Quantity</span>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <FiMinus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <FiPlus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="destructive" className="flex-1">
                                <FiTrash2 className="mr-2 h-4 w-4" />
                                Remove
                            </Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}