'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Action {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'default' | 'outline' | 'secondary';
}

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: Action[];
    currentPage?: string;
}

export function PageHeader({ title, description, actions = [] }: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    {description && (
                        <p className="text-gray-600 mt-2">{description}</p>
                    )}
                </div>

                <div className="flex space-x-2">
                    {actions.map((action, index) => (
                        action.href ? (
                            <Link key={index} href={action.href}>
                                <Button variant={action.variant || 'default'}>
                                    {action.label}
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                key={index}
                                variant={action.variant || 'default'}
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        )
                    ))}
                </div>
            </div>
        </motion.div>
    );
}