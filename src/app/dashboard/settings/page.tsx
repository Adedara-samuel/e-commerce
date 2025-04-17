/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiUser, FiLock, FiBell, FiCreditCard, FiGlobe, FiDatabase, FiLogOut, FiX, FiCheck } from 'react-icons/fi';
import { Card, Switch, Button, Input, Select, Checkbox } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { deleteCookie, setCookie, getCookie } from 'cookies-next';
import { useState, useEffect, JSX } from 'react';
import { Radio } from 'lucide-react';

type UserData = {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    language: string;
    region: string;
    dateFormat: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    twoFactor: boolean;
    paymentMethods: {
        id: string;
        type: string;
        last4: string;
        expiry: string;
        primary: boolean;
    }[];
    currentPlan: string;
};

export default function SettingsPage() {
    const router = useRouter();
    const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData>({
        name: 'Adedara SP',
        email: 'sapoktech.c@gmail.com',
        bio: '',
        avatar: 'SP',
        language: 'English (United States)',
        region: 'United States',
        dateFormat: 'MM/DD/YYYY',
        notifications: {
            email: true,
            push: false,
            sms: false,
        },
        twoFactor: true,
        paymentMethods: [
            {
                id: '1',
                type: 'visa',
                last4: '4242',
                expiry: '12/25',
                primary: true,
            },
            {
                id: '2',
                type: 'mastercard',
                last4: '5555',
                expiry: '06/24',
                primary: false,
            },
        ],
        currentPlan: 'Premium ($29/month)',
    });
    const [formData, setFormData] = useState<Partial<UserData>>({});
    const [deleteConfirm, setDeleteConfirm] = useState('');
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [exportFormat, setExportFormat] = useState('json');
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: '',
        primary: false,
    });

    // Load user data from cookies on component mount
    useEffect(() => {
        const savedData = getCookie('user-settings');
        if (savedData) {
            setUserData(JSON.parse(savedData as string));
        }
    }, []);

    // Save user data to cookies whenever it changes
    useEffect(() => {
        setCookie('user-settings', JSON.stringify(userData));
    }, [userData]);

    const handleLogout = () => {
        deleteCookie('auth-token');
        deleteCookie('user-id');
        deleteCookie('user-settings');
        router.push('/login');
    };

    const openDrawer = (drawerName: string) => {
        // Reset form data when opening a drawer
        setFormData({});
        setActiveDrawer(drawerName);
    };

    const closeDrawer = () => {
        setActiveDrawer(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (type: keyof UserData['notifications']) => {
        setUserData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type],
            },
        }));
    };

    const handleTwoFactorChange = () => {
        setUserData(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
    };

    const handleSaveProfile = () => {
        setUserData(prev => ({
            ...prev,
            name: formData.name || prev.name,
            email: formData.email || prev.email,
            bio: formData.bio || prev.bio,
        }));
        closeDrawer();
    };

    const handleSavePassword = () => {
        // In a real app, you would handle password change here
        closeDrawer();
    };

    const handleSaveLanguage = () => {
        setUserData(prev => ({
            ...prev,
            language: formData.language || prev.language,
            region: formData.region || prev.region,
            dateFormat: formData.dateFormat || prev.dateFormat,
        }));
        closeDrawer();
    };

    const handleRequestExport = () => {
        // In a real app, you would trigger data export here
        alert(`Your data export in ${exportFormat} format has been requested. You will receive an email when it's ready.`);
        closeDrawer();
    };

    const handleDeleteAccount = () => {
        if (deleteConfirm === 'DELETE') {
            // In a real app, you would handle account deletion here
            handleLogout();
        }
    };

    const handleAddPaymentMethod = () => {
        // Basic validation
        if (!newPaymentMethod.cardNumber || !newPaymentMethod.expiry || !newPaymentMethod.cvc || !newPaymentMethod.name) {
            alert('Please fill in all payment method details');
            return;
        }

        // In a real app, you would validate the card and process it with a payment processor
        const last4 = newPaymentMethod.cardNumber.slice(-4);
        const newMethod = {
            id: `pm_${Math.random().toString(36).substring(2, 10)}`,
            type: 'visa', // This would be determined from the card number in a real app
            last4,
            expiry: newPaymentMethod.expiry,
            primary: newPaymentMethod.primary,
        };

        setUserData(prev => ({
            ...prev,
            paymentMethods: newMethod.primary
                ? [{ ...newMethod, primary: true }, ...prev.paymentMethods.map(m => ({ ...m, primary: false }))]
                : [...prev.paymentMethods, newMethod],
        }));

        // Reset form
        setNewPaymentMethod({
            cardNumber: '',
            expiry: '',
            cvc: '',
            name: '',
            primary: false,
        });

        closeDrawer();
    };

    const handleRemovePaymentMethod = (id: string) => {
        setUserData(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.filter(method => method.id !== id),
        }));
    };

    const handleSetPrimaryPaymentMethod = (id: string) => {
        setUserData(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.map(method => ({
                ...method,
                primary: method.id === id,
            })),
        }));
    };

    const handleChangePlan = (plan: string) => {
        setUserData(prev => ({
            ...prev,
            currentPlan: plan,
        }));
        closeDrawer();
    };

    const settingsSections = [
        {
            title: "Account Settings",
            icon: <FiUser className="text-red-500" />,
            items: [
                {
                    title: "Profile Information",
                    description: "Update your name, email, and profile picture",
                    action: () => openDrawer('profile')
                },
                {
                    title: "Change Password",
                    description: "Update your account password",
                    action: () => openDrawer('password')
                },
                {
                    title: "Two-Factor Authentication",
                    description: "Add an extra layer of security",
                    rightElement: (
                        <Switch
                            checked={userData.twoFactor}
                            onChange={handleTwoFactorChange}
                        />
                    )
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
                    rightElement: (
                        <Switch
                            checked={userData.notifications.email}
                            onChange={() => handleNotificationChange('email')}
                        />
                    )
                },
                {
                    title: "Push Notifications",
                    description: "Control app notifications",
                    rightElement: (
                        <Switch
                            checked={userData.notifications.push}
                            onChange={() => handleNotificationChange('push')}
                        />
                    )
                },
                {
                    title: "SMS Alerts",
                    description: "Configure text message alerts",
                    rightElement: (
                        <Switch
                            checked={userData.notifications.sms}
                            onChange={() => handleNotificationChange('sms')}
                        />
                    )
                }
            ]
        },
        {
            title: "Billing & Plans",
            icon: <FiCreditCard className="text-green-500" />,
            items: [
                {
                    title: "Payment Methods",
                    description: `${userData.paymentMethods.length} cards saved`,
                    action: () => openDrawer('payments')
                },
                {
                    title: "Billing History",
                    description: "View your past invoices and receipts",
                    action: () => openDrawer('billing')
                },
                {
                    title: "Current Plan",
                    description: userData.currentPlan,
                    action: () => openDrawer('plans')
                }
            ]
        },
        {
            title: "Advanced",
            icon: <FiDatabase className="text-purple-500" />,
            items: [
                {
                    title: "Language & Region",
                    description: `${userData.language} (${userData.region})`,
                    action: () => openDrawer('language')
                },
                {
                    title: "Data Export",
                    description: "Download your account data",
                    action: () => openDrawer('export')
                },
                {
                    title: "Delete Account",
                    description: "Permanently remove your account",
                    action: () => openDrawer('delete')
                }
            ]
        }
    ];

    const drawerContents: Record<string, { title: string; content: JSX.Element }> = {
        profile: {
            title: "Profile Information",
            content: (
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                                {userData.avatar}
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Recommended: Square image, at least 500x500 pixels</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input
                                type="text"
                                name="name"
                                defaultValue={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input
                                type="email"
                                name="email"
                                defaultValue={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                name="bio"
                                rows={3}
                                defaultValue={userData.bio}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Tell us about yourself..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            )
        },
        password: {
            title: "Change Password",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <Input
                            type="password"
                            name="currentPassword"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <Input
                            type="password"
                            name="newPassword"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button onClick={handleSavePassword}>
                            Update Password
                        </Button>
                    </div>
                </div>
            )
        },
        language: {
            title: "Language & Region",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Language</h3>
                        <Select
                            name="language"
                            defaultValue={userData.language}
                            // onChange={handleInputChange}
                        >
                            <option>English (United States)</option>
                            <option>English (UK)</option>
                            <option>Français (French)</option>
                            <option>Español (Spanish)</option>
                            <option>Deutsch (German)</option>
                        </Select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Region</h3>
                        <Select
                            name="region"
                            defaultValue={userData.region}
                            // onChange={handleInputChange}
                        >
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>Nigeria</option>
                        </Select>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Date Format</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="dateFormat"
                                    values="MM/DD/YYYY"
                                    // checked={userData.dateFormat === 'MM/DD/YYYY'}
                                    onChange={() => setFormData(prev => ({ ...prev, dateFormat: 'MM/DD/YYYY' }))}
                                />
                                <span>MM/DD/YYYY (12/31/2025)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="dateFormat"
                                    values="DD/MM/YYYY"
                                    // checked={userData.dateFormat === 'DD/MM/YYYY'}
                                    onChange={() => setFormData(prev => ({ ...prev, dateFormat: 'DD/MM/YYYY' }))}
                                />
                                <span>DD/MM/YYYY (31/12/2025)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="dateFormat"
                                    values="YYYY-MM-DD"
                                    // checked={userData.dateFormat === 'YYYY-MM-DD'}
                                    onChange={() => setFormData(prev => ({ ...prev, dateFormat: 'YYYY-MM-DD' }))}
                                />
                                <span>YYYY-MM-DD (2025-12-31)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveLanguage}>
                            Save Preferences
                        </Button>
                    </div>
                </div>
            )
        },
        export: {
            title: "Data Export",
            content: (
                <div className="space-y-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Your data export will include all personal data we have about you in a machine-readable format. This may take several minutes to prepare.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Export Format</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="exportFormat"
                                    values="json"
                                    // checked={exportFormat === 'json'}
                                    onChange={() => setExportFormat('json')}
                                />
                                <span>JSON (Recommended for developers)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="exportFormat"
                                    values="csv"
                                    // checked={exportFormat === 'csv'}
                                    onChange={() => setExportFormat('csv')}
                                />
                                <span>CSV (Spreadsheet format)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <Radio
                                    name="exportFormat"
                                    values="xml"
                                    // checked={exportFormat === 'xml'}
                                    onChange={() => setExportFormat('xml')}
                                />
                                <span>XML (Legacy systems)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button onClick={handleRequestExport}>
                            Request Data Export
                        </Button>
                    </div>
                </div>
            )
        },
        delete: {
            title: "Delete Account",
            content: (
                <div className="space-y-6">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    Warning: This action is permanent. All your data will be erased and cannot be recovered.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To confirm, type "DELETE" below:
                        </label>
                        <Input
                            type="text"
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            placeholder="DELETE"
                        />
                    </div>

                    <div>
                        <label className="flex items-center space-x-2">
                            <Checkbox
                                checked={deleteConfirmed}
                                onChange={(e) => setFormData(prev => ({ ...prev, deleteConfirmed: (e.target as HTMLInputElement).checked }))}
                            />
                            <span className="text-sm text-gray-700">
                                I understand this action is irreversible and all my data will be permanently deleted.
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={deleteConfirm !== 'DELETE' || !deleteConfirmed}
                            onClick={handleDeleteAccount}
                        >
                            Permanently Delete Account
                        </Button>
                    </div>
                </div>
            )
        },
        payments: {
            title: "Payment Methods",
            content: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Your Payment Methods</h3>
                        {userData.paymentMethods.length === 0 ? (
                            <p className="text-sm text-gray-500">No payment methods saved</p>
                        ) : (
                            <div className="space-y-3">
                                {userData.paymentMethods.map(method => (
                                    <div key={method.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-6 rounded flex items-center justify-center ${method.type === 'visa' ? 'bg-blue-500' : 'bg-purple-500'
                                                }`}>
                                                <span className="text-white text-xs font-bold">
                                                    {method.type === 'visa' ? 'VISA' : 'MC'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium">•••• •••• •••• {method.last4}</p>
                                                <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {method.primary ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Primary
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleSetPrimaryPaymentMethod(method.id)}
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    Make primary
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemovePaymentMethod(method.id)}
                                                className="text-sm text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Payment Method</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <Input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={newPaymentMethod.cardNumber}
                                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cardNumber: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <Input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={newPaymentMethod.expiry}
                                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, expiry: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                    <Input
                                        type="text"
                                        placeholder="123"
                                        value={newPaymentMethod.cvc}
                                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cvc: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    value={newPaymentMethod.name}
                                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={newPaymentMethod.primary}
                                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, primary: (e.target as HTMLInputElement).checked }))}
                                    />
                                    <span className="text-sm text-gray-700">Set as primary payment method</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddPaymentMethod}>
                            Add Payment Method
                        </Button>
                    </div>
                </div>
            )
        },
        billing: {
            title: "Billing History",
            content: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Past Invoices</h3>
                        <div className="bg-white shadow overflow-hidden rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Download
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            June 1, 2025
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $29.00
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href="#" className="text-red-600 hover:text-red-900">PDF</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            May 1, 2025
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $29.00
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href="#" className="text-red-600 hover:text-red-900">PDF</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            April 1, 2025
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            $29.00
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href="#" className="text-red-600 hover:text-red-900">PDF</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Close
                        </Button>
                    </div>
                </div>
            )
        },
        plans: {
            title: "Change Plan",
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className={`border rounded-lg p-6 ${userData.currentPlan.includes('Basic') ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                            <h3 className="text-lg font-medium text-gray-900">Basic</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900">$9<span className="text-base font-normal text-gray-500">/month</span></p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">10 projects</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">5 team members</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Basic analytics</span>
                                </li>
                            </ul>
                            <Button
                                className="w-full mt-6"
                                variant={userData.currentPlan.includes('Basic') ? 'default' : 'outline'}
                                onClick={() => handleChangePlan('Basic ($9/month)')}
                            >
                                {userData.currentPlan.includes('Basic') ? 'Current Plan' : 'Select Plan'}
                            </Button>
                        </div>

                        <div className={`border rounded-lg p-6 ${userData.currentPlan.includes('Premium') ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Premium</h3>
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Popular
                                </span>
                            </div>
                            <p className="mt-2 text-3xl font-bold text-gray-900">$29<span className="text-base font-normal text-gray-500">/month</span></p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Unlimited projects</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">20 team members</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Advanced analytics</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Priority support</span>
                                </li>
                            </ul>
                            <Button
                                className="w-full mt-6"
                                variant={userData.currentPlan.includes('Premium') ? 'default' : 'outline'}
                                onClick={() => handleChangePlan('Premium ($29/month)')}
                            >
                                {userData.currentPlan.includes('Premium') ? 'Current Plan' : 'Select Plan'}
                            </Button>
                        </div>

                        <div className={`border rounded-lg p-6 ${userData.currentPlan.includes('Enterprise') ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
                            <h3 className="text-lg font-medium text-gray-900">Enterprise</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900">$99<span className="text-base font-normal text-gray-500">/month</span></p>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Unlimited projects</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Unlimited members</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Advanced analytics</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">24/7 support</span>
                                </li>
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Custom integrations</span>
                                </li>
                            </ul>
                            <Button
                                className="w-full mt-6"
                                variant={userData.currentPlan.includes('Enterprise') ? 'default' : 'outline'}
                                onClick={() => handleChangePlan('Enterprise ($99/month)')}
                            >
                                {userData.currentPlan.includes('Enterprise') ? 'Current Plan' : 'Select Plan'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={closeDrawer}>
                            Close
                        </Button>
                    </div>
                </div>
            )
        }
    };

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
                                    {userData.avatar}
                                </div>
                                <button className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                                <p className="text-gray-600 mb-2">{userData.email}</p>
                                <p className="text-sm text-gray-500">Administrator • Joined June 2025</p>
                            </div>
                            <div className="sm:ml-auto">
                                <Button variant="outline" onClick={() => openDrawer('profile')}>
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

            {/* Side Drawer */}
            <AnimatePresence>
                {activeDrawer && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={closeDrawer}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
                        >
                            <div className="h-full flex flex-col">
                                {/* Drawer Header */}
                                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {drawerContents[activeDrawer]?.title}
                                    </h2>
                                    <button
                                        onClick={closeDrawer}
                                        className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <FiX className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Drawer Content */}
                                <div className="flex-1 p-6">
                                    {drawerContents[activeDrawer]?.content}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}