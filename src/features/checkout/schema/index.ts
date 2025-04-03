// lib/schemas/checkout.schema.ts
import * as z from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
    paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit_card') {
        if (!data.cardNumber || data.cardNumber.length < 16) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Valid card number is required',
                path: ['cardNumber'],
            });
        }
        if (!data.expiry || !/^\d{2}\/\d{2}$/.test(data.expiry)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Valid expiry date (MM/YY) required',
                path: ['expiry'],
            });
        }
        if (!data.cvc || data.cvc.length < 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Valid CVC required',
                path: ['cvc'],
            });
        }
    }
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;