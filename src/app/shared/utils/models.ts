export type User = {
    username: string;
    email: string;
    password: string;
}

export type UserResponse = User & {
    id: number;
}

export type Product = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number, count: number }
}

export type ProductResponse = Product & {
    id: number;
}