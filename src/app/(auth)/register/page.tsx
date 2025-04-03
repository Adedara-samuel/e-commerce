/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components';
import { AuthForm } from '@/components';

export default function RegisterPage({ searchParams }: { searchParams: { redirect?: string } }) {
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
                        href={`/login?redirect=${searchParams.redirect || '/'}`}
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        sign in to your existing account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    <AuthForm type="register" redirect={searchParams.redirect} />
                </div>
            </div>
        </div>
    );
}