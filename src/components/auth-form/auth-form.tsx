/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function AuthForm({ type, redirect }: { type: 'login' | 'register'; redirect?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isRegister = type === 'register';

    const form = useForm<{
        email: string;
        password: string;
        name?: string;
        confirmPassword?: string;
    }>({
        resolver: zodResolver(isRegister ? registerSchema : loginSchema),
        defaultValues: {
            email: '',
            password: '',
            ...(isRegister && { name: '', confirmPassword: '' })
        },
        mode: 'onChange' // Validate on every change
    });

    // Watch all fields to enable/disable submit button
    const watchAllFields = form.watch();
    const isFormValid = form.formState.isValid;

    const onSubmit = async (data: any) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            document.cookie = `auth-token=simulated-token; path=/; max-age=86400`;
            toast.success(isRegister ? 'Account created successfully!' : 'Login successful!');
            if (isRegister) {
                router.push('/login');
            } else {
                router.push(redirect || '/dashboard');
            }
        } catch (error) {
            toast.error('Authentication failed. Please try again.');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {isRegister && (
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {isRegister && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={!isFormValid || form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? (
                        'Processing...'
                    ) : isRegister ? (
                        'Create Account'
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>
        </Form>
    );
}