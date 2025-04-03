import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiTruck } from 'react-icons/fi';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart-store';

export const OrderSummaryCard = ({ isProcessing }: { isProcessing: boolean }) => {
    const { items, totalPrice } = useCartStore();

    return (
        <>
            <Card className="sticky top-4">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                        <FiCheckCircle className="mr-2" />
                        Order Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative h-12 w-12 min-w-[48px] rounded overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.quantity} × ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Place Order"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center">
                        <FiTruck className="mr-2" />
                        Delivery Estimate
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-gray-700">
                        Standard delivery: 3-5 business days
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Orders placed before 3pm EST ship same day
                    </p>
                </CardContent>
            </Card>
        </>
    );
};