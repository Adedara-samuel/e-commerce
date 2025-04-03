// components/ui/Skeleton.tsx
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
            <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}