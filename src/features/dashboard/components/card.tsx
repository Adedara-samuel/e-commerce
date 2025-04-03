'use client';

import { motion } from 'framer-motion';

interface CardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
}

export function Card({ title, value, change, icon }: CardProps) {
    const isPositive = change.startsWith('+');

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
            <div className="flex justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {change} from last month
                    </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}