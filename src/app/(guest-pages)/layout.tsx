import { Header } from '@/components'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <main className='bg-gray-50 min-h-screen' >
                <Header />
                {children}
            </main>
    );
}