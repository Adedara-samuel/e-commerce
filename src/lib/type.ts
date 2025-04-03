export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    alt: string;
    originalPrice?: number;
    sold?: number;
    discount?: number;
    rating?: number;
    reviews?: number;
}

export interface Category {
    name: string;
    icon: React.ReactNode;
    color: string;
}