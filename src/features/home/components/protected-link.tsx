'use client';
import { useRouter } from 'next/navigation';

interface ProtectedLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function ProtectedLink({ href, children, className }: ProtectedLinkProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}