/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ui/button.tsx
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-primary text-white hover:bg-primary/90",
                secondary: "bg-white text-gray-900 hover:bg-gray-100",
                outline: "border border-gray-300 bg-white hover:bg-gray-50",
            },
            size: {
                sm: "h-9 px-3 text-sm",
                default: "h-10 px-4 py-2",
                lg: "h-11 px-8 text-lg",
                icon: "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
