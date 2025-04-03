import Link from 'next/link';
import { Button } from '@/components';
import { AuthForm } from '@/components';

export default function LoginPage({ searchParams }: { searchParams: { redirect?: string } }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/" className="text-xl font-bold">
                        Shop<span className="text-red-600">Now</span>
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link
                        href={`/register?redirect=${searchParams.redirect || '/'}`}
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    <AuthForm type="login" redirect={searchParams.redirect} />

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="secondary" className="w-full">
                                Google
                            </Button>
                            <Button variant="secondary" className="w-full">
                                Facebook
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}