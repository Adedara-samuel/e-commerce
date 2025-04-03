/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FiMapPin } from 'react-icons/fi';

export const ShippingInformationCard = ({ form }: { form: any }) => (
    <Card>
        <CardHeader className="border-b">
            <CardTitle className="flex items-center">
                <FiMapPin className="mr-2" />
                Shipping Information
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="firstName">First Name</Label>
                            <FormControl>
                                <Input id="firstName" placeholder="Samuel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="lastName">Last Name</Label>
                            <FormControl>
                                <Input id="lastName" placeholder="Precious" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <FormControl>
                                <Input id="address" placeholder="123 Updown St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="city">City</Label>
                            <FormControl>
                                <Input id="city" placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="state">State/Province</Label>
                            <FormControl>
                                <Input id="state" placeholder="CA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="zip">ZIP/Postal Code</Label>
                            <FormControl>
                                <Input id="zip" placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="country">Country</Label>
                            <FormControl>
                                <Input id="country" placeholder="United AbR" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </CardContent>
    </Card>
);