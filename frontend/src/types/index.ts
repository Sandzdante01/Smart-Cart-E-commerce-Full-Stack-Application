export type ProductStatus = 'Active' | 'Draft' | 'Out of Stock';

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  badge: string;
  sku: string;
  status: ProductStatus;
  description: string;
  images: string[];
  specs: Specification[];
  createdAt: string;
  sales: number;
  featured: boolean;
  flashSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  description: string;
}

export type UserRole = 'customer' | 'admin';

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  avatarInitials: string;
  joined: string;
  addresses: Address[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  payment: string;
  status: OrderStatus;
  address: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerInitials: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  status: 'Published' | 'Pending';
  verified: boolean;
}

export interface AppNotification {
  id: string;
  type: 'order' | 'stock' | 'delivery' | 'customer';
  message: string;
  time: string;
  read: boolean;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  joined: string;
  status: 'Active' | 'Inactive';
  location: string;
}