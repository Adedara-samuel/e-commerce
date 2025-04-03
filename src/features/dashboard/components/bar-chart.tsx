/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    data: { month: string; revenue: number }[];
}

export function BarChart({ data }: BarChartProps) {
    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Revenue ($)',
                data: data.map(item => item.revenue),
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
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `$${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    callback: (value: any) => `$${value.toLocaleString()}`
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
}