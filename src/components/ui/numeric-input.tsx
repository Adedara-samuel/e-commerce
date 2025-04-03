/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ui/NumericInput.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function NumericInput({
    value,
    min = 1,
    max,
    onChange,
}: {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
}) {
    const handleIncrement = () => {
        if (max === undefined || value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div className="flex items-center border rounded-md overflow-hidden">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDecrement}
                className="px-2 py-1"
                disabled={value <= min}
            >
                -
            </Button>
            <span className="px-3 text-center w-10">{value}</span>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleIncrement}
                className="px-2 py-1"
                disabled={max !== undefined && value >= max}
            >
                +
            </Button>
        </div>
    );
}