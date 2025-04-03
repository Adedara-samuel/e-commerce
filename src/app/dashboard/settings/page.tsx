/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiCreditCard, FiGlobe, FiDatabase, FiLogOut } from 'react-icons/fi';
import { Card, Switch, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('auth-token');
        deleteCookie('user-id');
        router.push('/login');
    };

    const settingsSections = [
        {
            title: "Account Settings",
            icon: <FiUser className="text-red-500" />,
            items: [
                {
                    title: "Profile Information",
                    description: "Update your name, email, and profile picture",
                    action: () => router.push('/settings/profile')
                },
                {
                    title: "Change Password",
                    description: "Update your account password",
                    action: () => router.push('/settings/password')
                },
                {
                    title: "Two-Factor Authentication",
                    description: "Add an extra layer of security",
                    rightElement: <Switch checked={true} onChange={() => { }} />
                }
            ]
        },
        {
            title: "Notifications",
            icon: <FiBell className="text-blue-500" />,
            items: [
                {
                    title: "Email Notifications",
                    description: "Manage what emails you receive",
                    rightElement: <Switch checked={true} onChange={() => { }} />
                },
                {
                    title: "Push Notifications",
                    description: "Control app notifications",
                    rightElement: <Switch checked={false} onChange={() => { }} />
                },
                {
                    title: "SMS Alerts",
                    description: "Configure text message alerts",
                    rightElement: <Switch checked={false} onChange={() => { }} />
                }
            ]
        },
        {
            title: "Billing & Plans",
            icon: <FiCreditCard className="text-green-500" />,
            items: [
                {
                    title: "Payment Methods",
                    description: "Manage your credit cards and payment options",
                    action: () => router.push('/settings/payments')
                },
                {
                    title: "Billing History",
                    description: "View your past invoices and receipts",
                    action: () => router.push('/settings/billing')
                },
                {
                    title: "Current Plan",
                    description: "Premium Plan ($29/month)",
                    action: () => router.push('/settings/plans')
                }
            ]
        },
        {
            title: "Advanced",
            icon: <FiDatabase className="text-purple-500" />,
            items: [
                {
                    title: "Language & Region",
                    description: "English (United States)",
                    action: () => router.push('/settings/language')
                },
                {
                    title: "Data Export",
                    description: "Download your account data",
                    action: () => router.push('/settings/export')
                },
                {
                    title: "Delete Account",
                    description: "Permanently remove your account",
                    action: () => router.push('/settings/delete-account')
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2"
                    >
                        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    </motion.div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="text-gray-600 hover:text-red-600 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                {/* User Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card className="p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                                    JD
                                </div>
                                <button className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                                <p className="text-gray-600 mb-2">john.doe@example.com</p>
                                <p className="text-sm text-gray-500">Administrator • Joined June 2023</p>
                            </div>
                            <div className="sm:ml-auto">
                                <Button variant="outline" onClick={() => router.push('/settings/profile')}>
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Settings Sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {settingsSections.map((section, sectionIndex) => (
                        <Card key={sectionIndex} className="p-0 overflow-hidden">
                            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                                <div className="flex items-center">
                                    <div className="p-2 rounded-lg bg-opacity-20 mr-3" style={{
                                        backgroundColor: `${section.icon.props.className.includes('text-red-500') ? 'rgba(239, 68, 68, 0.1)' :
                                            section.icon.props.className.includes('text-blue-500') ? 'rgba(59, 130, 246, 0.1)' :
                                                section.icon.props.className.includes('text-green-500') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(168, 85, 247, 0.1)'}`
                                    }}>
                                        {section.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                                        onClick={item.action}
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-800">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        {item.rightElement || (
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </motion.div>

                {/* Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                >
                    <Button
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleLogout}
                    >
                        <FiLogOut className="mr-2" />
                        Log Out
                    </Button>
                </motion.div>
            </main>
        </div>
    );
}