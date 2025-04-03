/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Sales Chart Component
export function SalesChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Sales',
                data: [4000, 3000, 5000, 2780, 1890, 2390, 3490],
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return <Line data={data} options={options} />;
}

// Revenue Chart Component
export function RevenueChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue',
                data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: '#EF4444',
                borderWidth: 1,
                borderRadius: 4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context: any) => `$${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { callback: (value: any) => `$${value.toLocaleString()}` }
            },
            x: { grid: { display: false } }
        }
    };

    return <Bar data={data} options={options} />;
}

// Customer Chart Component
export function CustomerChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'New Customers',
                data: [45, 32, 68, 52, 61, 47, 72],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                fill: true
            },
            {
                label: 'Returning Customers',
                data: [28, 25, 35, 31, 42, 38, 45],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const }
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    };

    return <Line data={data} options={options} />;
}