import { PageHeader } from '@/components';
import { ProductGrid } from '@/components';

export default function ProductsPage() {
    return (
        <>
            <PageHeader
                title="Products"
                description="Manage your product catalog"
                actions={[
                    { label: 'Add Product', href: '/dashboard/products/new' }
                ]}
            />

            <ProductGrid />
        </>
    );
}