export type User = {
  username: string;
  email: string;
  password: string;
};

export type UserResponse = User & {
  id: number;
};

export type Product = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductResponse = Product & {
  id: number;
  rating: { rate: number; count: number };
};

export type CartResponse = {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
};

export type CartProduct = ProductResponse & {
  quantity: number;
};

export interface CartItem {
  productId: number;
  quantity: number;
}

export type StateProductsResponse = {
  loading: boolean;
  error: boolean;
  products: ProductResponse[];
};

export type StateProductResponse = {
  loading: boolean;
  error: boolean;
  product: ProductResponse | null;
};

export type StateDashboardResponse = {
  loading: boolean;
  error: boolean;
  count: number;
};

export type CartState = {
  loading: boolean;
  error: boolean;
  cartProducts: CartProduct[];
  totalPrice: number;
}
