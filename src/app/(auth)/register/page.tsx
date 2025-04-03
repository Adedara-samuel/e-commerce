'use client';

import { Suspense } from 'react';
import { AuthForm } from '@/components';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/" className="text-xl font-bold">
                        Shop<span className="text-red-600">Now</span>
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create a new account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                        href={'/login'}
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        sign in to your existing account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    {/* Wrapped AuthForm in Suspense with loading fallback */}
                    <Suspense fallback={
                        <div className="text-center py-8">
                            <div className="animate-pulse flex flex-col space-y-4">
                                <div className="h-10 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                                <div className="h-10 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    }>
                        <AuthForm type="register" />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}