/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FiCreditCard } from 'react-icons/fi';

export const PaymentMethodCard = ({ form, paymentMethod }: { form: any, paymentMethod: string }) => (
    <Card>
        <CardHeader className="border-b">
            <CardTitle className="flex items-center">
                <FiCreditCard className="mr-2" />
                Payment Method
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
            <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="credit_card" id="credit_card" />
                            <Label htmlFor="credit_card">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                            <Label htmlFor="bank_transfer">Bank Transfer</Label>
                        </div>
                    </RadioGroup>
                )}
            />

            {paymentMethod === 'credit_card' && (
                <div className="mt-6 space-y-4">
                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <FormControl>
                                    <Input
                                        id="cardNumber"
                                        placeholder="4242 4242 4242 4242"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                            const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                            field.onChange(formatted);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <FormControl>
                                        <Input
                                            id="expiry"
                                            placeholder="MM/YY"
                                            {...field}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, '');
                                                if (value.length > 2) {
                                                    value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                                                }
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <FormControl>
                                        <Input
                                            id="cvc"
                                            placeholder="123"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}
        </CardContent>
    </Card>
);