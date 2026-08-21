/**
 * Frontend API abstraction layer.
 * Talk to Express + MongoDB backend.
 */
import type {
  AppNotification,
  Category,
  CustomerRecord,
  Order,
  Product,
  Review,
  User,
  OrderStatus
} from '../types';

export const API_BASE_URL = '/api';

export const api = {
  getProducts: (): Promise<Product[]> =>
    fetch(`${API_BASE_URL}/products`).then(res => res.json()),

  getProductBySlug: (slug: string): Promise<Product | undefined> =>
    fetch(`${API_BASE_URL}/products/slug/${slug}`)
      .then(res => {
        if (!res.ok) return undefined;
        return res.json();
      }),

  getCategories: (): Promise<Category[]> =>
    fetch(`${API_BASE_URL}/categories`).then(res => res.json()),

  getOrders: (): Promise<Order[]> =>
    fetch(`${API_BASE_URL}/orders`).then(res => res.json()),

  getOrdersByCustomer: (customerId: string): Promise<Order[]> =>
    fetch(`${API_BASE_URL}/orders/customer/${customerId}`).then(res => res.json()),

  getReviews: (): Promise<Review[]> =>
    fetch(`${API_BASE_URL}/reviews`).then(res => res.json()),

  getNotifications: (): Promise<AppNotification[]> =>
    fetch(`${API_BASE_URL}/notifications`).then(res => res.json()),

  getCustomers: (): Promise<CustomerRecord[]> =>
    fetch(`${API_BASE_URL}/customers`).then(res => res.json()),

  login: (email: string, password: string): Promise<User> =>
    fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(async res => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Credentials do not match our records.');
      }
      return res.json();
    }),

  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<User> =>
    fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json()),

  subscribeNewsletter: (email: string): Promise<{ ok: boolean; email: string }> =>
    fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(res => res.json()),

  sendContactMessage: (payload: Record<string, string>): Promise<{ ok: boolean; payload: any }> =>
    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(res => res.json()),

  // Backend mutations for StoreContext
  placeOrder: (payload: {
    customerId: string;
    customerName: string;
    items: Array<{
      productId: string;
      name: string;
      brand: string;
      image: string;
      price: number;
      quantity: number;
    }>;
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
    payment: string;
    address: string;
  }): Promise<Order> =>
    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(async res => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to place order.');
      }
      return res.json();
    }),

  updateOrderStatus: (orderId: string, status: OrderStatus): Promise<Order> =>
    fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(res => res.json()),

  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>): Promise<Review> =>
    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    }).then(res => res.json()),

  deleteReview: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE'
    }).then(() => undefined),

  markAllRead: (): Promise<AppNotification[]> =>
    fetch(`${API_BASE_URL}/notifications/read`, {
      method: 'PATCH'
    }).then(res => res.json()),

  clearNotifications: (): Promise<AppNotification[]> =>
    fetch(`${API_BASE_URL}/notifications`, {
      method: 'DELETE'
    }).then(res => res.json()),

  createProduct: (product: any): Promise<Product> =>
    fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(res => {
      if (!res.ok) throw new Error('Failed to create product');
      return res.json();
    }),

  updateProduct: (id: string, updates: any): Promise<Product> =>
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }).then(res => {
      if (!res.ok) throw new Error('Failed to update product');
      return res.json();
    }),

  deleteProduct: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to delete product');
    }),

  createCategory: (category: any): Promise<Category> =>
    fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    }).then(res => {
      if (!res.ok) throw new Error('Failed to create category');
      return res.json();
    }),

  updateCategory: (id: string, updates: any): Promise<Category> =>
    fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }).then(res => {
      if (!res.ok) throw new Error('Failed to update category');
      return res.json();
    }),

  deleteCategory: (id: string): Promise<void> =>
    fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) throw new Error('Failed to delete category');
    })
};