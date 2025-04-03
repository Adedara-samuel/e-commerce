'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export function NewProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" {...register('name', { required: true })} />
                    {errors.name && <p className="text-sm text-red-600">Name is required</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" {...register('price', { required: true })} />
                    {errors.price && <p className="text-sm text-red-600">Price is required</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} rows={3} />
            </div>

            <div className="flex items-center space-x-2">
                <Switch id="status" {...register('status')} />
                <Label htmlFor="status">Active Product</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline">
                    Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Add Product
                </Button>
            </div>
        </form>
    );
}