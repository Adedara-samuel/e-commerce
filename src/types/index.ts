export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating?: number;
    reviews?: number;
    discount?: number;
    originalPrice?: number;
    colors?: string[];
    storage?: string[];
    category?: string;
    tags?: string[];
    inStock?: boolean;
    featured?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products?: Product[];
    parentCategory?: string;
    featured?: boolean;
}

export interface Deal {
    id: number;
    name: string;
    description: string;
    discount: number;
    startDate: Date;
    endDate: Date;
    products: number[];
    bannerImage?: string;
    terms?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
    color?: string;
    storage?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: Address;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault?: boolean;
}

export interface Review {
    id: string;
    userId: string;
    productId: number;
    rating: number;
    title?: string;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: Pagination;
}

export interface ProductFilterOptions {
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    storage?: string[];
    ratings?: number[];
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
    searchQuery?: string;
    inStock?: boolean;
    featured?: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormError {
    field: string;
    message: string;
}

export interface OrderSummary {
    id: string;
    customer: string;
    date: string;
    amount: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
}

export interface OrderTableProps {
    orders?: Order[];
    isLoading?: boolean;
    onRowClick?: (orderId: string) => void;
}

// Utility types
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;