import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState } from
'react';
import { toast } from 'sonner';
import { api } from '../services/api';
import { socketService } from '../services/socket';
import { company } from '../data/company';
import type {
  AppNotification,
  CartItem,
  Order,
  OrderStatus,
  Product,
  Review,
  User } from
'../types';

interface CartLine extends CartItem {
  product: Product;
}

interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  count: number;
}

interface StoreValue {
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  reloadProducts: () => void;
  getProduct: (id: string) => Product | undefined;

  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => Promise<User>;
  logout: () => void;

  cart: CartItem[];
  cartLines: CartLine[];
  totals: CartTotals;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  moveToWishlist: (productId: string) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  orders: Order[];
  placeOrder: (payload: {payment: string;address: string;}) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  deleteReview: (id: string) => void;

  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  clearNotifications: () => void;

  recentlyUpdatedStock: string[];
}

const StoreContext = createContext<StoreValue | null>(null);

const DEMO_CART: CartItem[] = [
{ productId: 'p-001', quantity: 1 },
{ productId: 'p-003', quantity: 1 }];


const DEMO_WISHLIST = ['p-002', 'p-004', 'p-005', 'p-007'];

export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>(DEMO_CART);
  const [wishlist, setWishlist] = useState<string[]>(DEMO_WISHLIST);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [recentlyUpdatedStock, setRecentlyUpdatedStock] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    setProductsLoading(true);
    setProductsError(null);
    api.
    getProducts().
    then((data) => {
      if (!active) return;
      setProducts(data);
      setProductsLoading(false);
    }).
    catch(() => {
      if (!active) return;
      setProductsError('Unable to load products.');
      setProductsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [reloadToken]);

  useEffect(() => {
    api.getReviews().then(setReviews);
  }, [reloadToken]);

  useEffect(() => {
    api.getNotifications().then(setNotifications).catch(console.error);
  }, []);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }
    if (user.role === 'admin') {
      api.getOrders().then(setOrders).catch(console.error);
    } else {
      api.getOrdersByCustomer(user.id).then(setOrders).catch(console.error);
    }
  }, [user]);

  const pushNotification = useCallback((notification: Omit<AppNotification, 'time' | 'read'>) => {
    setNotifications((prev) => [{ ...notification, time: 'Just now', read: false }, ...prev]);
  }, []);

  /* ---- Realtime wiring: kept entirely out of UI components ---- */
  useEffect(() => {
    const disconnect = socketService.connect();

    const offStock = socketService.on('productStockUpdated', ({ productId, stock, productName }) => {
      setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, stock } : p));
      setRecentlyUpdatedStock((prev) => [...new Set([...prev, productId])]);
      setTimeout(
        () => setRecentlyUpdatedStock((prev) => prev.filter((id) => id !== productId)),
        4000
      );
      toast.info('Stock updated', { description: `${productName} — ${stock} remaining.` });
    });

    const offOrderStatus = socketService.on('orderStatusUpdated', ({ orderId, status }) => {
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
      toast.success('Order updated', { description: `${orderId} is now ${status}.` });
    });

    const offNewOrder = socketService.on('newOrder', ({ orderId, customerName }) => {
      toast.success('New order received', { description: `${orderId} from ${customerName}.` });
      if (user?.role === 'admin') {
        api.getOrders().then(setOrders).catch(console.error);
      }
    });

    const offNotification = socketService.on('newNotification', ({ id, type, message }) => {
      pushNotification({ id, type, message });
    });

    return () => {
      offStock();
      offOrderStatus();
      offNewOrder();
      offNotification();
      disconnect();
    };
  }, [pushNotification, user]);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const cartLines = useMemo<CartLine[]>(
    () =>
    cart.
    map((line) => {
      const product = products.find((p) => p.id === line.productId);
      return product ? { ...line, product } : null;
    }).
    filter((line): line is CartLine => line !== null),
    [cart, products]
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
    const discount = cartLines.reduce(
      (sum, l) => sum + Math.max(0, l.product.originalPrice - l.product.price) * l.quantity,
      0
    );
    const shipping =
    subtotal === 0 || subtotal >= company.freeShippingThreshold ? 0 : company.standardShipping;
    const count = cartLines.reduce((sum, l) => sum + l.quantity, 0);
    return { subtotal, discount, shipping, total: Math.max(0, subtotal - discount + shipping), count };
  }, [cartLines]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;
      if (product.stock === 0) {
        toast.error('Out of stock', { description: `${product.name} is currently unavailable.` });
        return;
      }
      setCart((prev) => {
        const existing = prev.find((l) => l.productId === productId);
        if (existing) {
          return prev.map((l) =>
          l.productId === productId ?
          { ...l, quantity: Math.min(product.stock, l.quantity + quantity) } :
          l
          );
        }
        return [...prev, { productId, quantity }];
      });
      toast.success('Added to cart', { description: product.name });
    },
    [products]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) =>
    quantity <= 0 ?
    prev.filter((l) => l.productId !== productId) :
    prev.map((l) => l.productId === productId ? { ...l, quantity } : l)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const product = products.find((p) => p.id === productId);
        if (exists) {
          toast('Removed from wishlist', { description: product?.name });
          return prev.filter((id) => id !== productId);
        }
        toast.success('Saved to wishlist', { description: product?.name });
        return [...prev, productId];
      });
    },
    [products]
  );

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const moveToWishlist = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((l) => l.productId !== productId));
      setWishlist((prev) => prev.includes(productId) ? prev : [...prev, productId]);
      toast.success('Saved for later', {
        description: products.find((p) => p.id === productId)?.name
      });
    },
    [products]
  );

  const login = useCallback(async (email: string, password: string) => {
    const loggedIn = await api.login(email, password);
    setUser(loggedIn);
    toast.success(`Welcome back, ${loggedIn.firstName}!`);
    return loggedIn;
  }, []);

  const register = useCallback(
    async (payload: {firstName: string;lastName: string;email: string;phone: string;}) => {
      const created = await api.register(payload);
      setUser(created);
      toast.success('Account created', { description: `Welcome to SmartCart, ${created.firstName}.` });
      return created;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    toast('Signed out', { description: 'You have been logged out of SmartCart.' });
  }, []);

  const placeOrder = useCallback(
    async ({ payment, address }: {payment: string;address: string;}) => {
      const orderPayload = {
        customerId: user?.id ?? 'u-1',
        customerName: user ? `${user.firstName} ${user.lastName}` : 'Kasun Perera',
        items: cartLines.map((l) => ({
          productId: l.product.id,
          name: l.product.name,
          brand: l.product.brand,
          image: l.product.images[0],
          price: l.product.price,
          quantity: l.quantity
        })),
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        payment,
        address
      };

      const createdOrder = await api.placeOrder(orderPayload);
      setOrders((prev) => [createdOrder, ...prev]);
      setCart([]);
      return createdOrder;
    },
    [cartLines, totals, user]
  );

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, status);
      // Socket event will update local state on broadcast
    } catch (err) {
      console.error(err);
      toast.error('Failed to update order status');
    }
  }, []);

  const addReview = useCallback(async (review: Omit<Review, 'id' | 'date' | 'status'>) => {
    try {
      const created = await api.addReview(review);
      setReviews((prev) => [created, ...prev]);
      setReloadToken((t) => t + 1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish review');
    }
  }, []);

  const deleteReview = useCallback(async (id: string) => {
    try {
      await api.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setReloadToken((t) => t + 1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review');
    }
  }, []);

  const markAllRead = useCallback(() => {
    api.markAllRead().then(setNotifications).catch(console.error);
  }, []);

  const clearNotifications = useCallback(() => {
    api.clearNotifications().then(setNotifications).catch(console.error);
  }, []);

  const value: StoreValue = {
    products,
    productsLoading,
    productsError,
    reloadProducts: () => setReloadToken((t) => t + 1),
    getProduct,
    user,
    login,
    register,
    logout,
    cart,
    cartLines,
    totals,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    moveToWishlist,
    wishlist,
    toggleWishlist,
    isWishlisted,
    orders,
    placeOrder,
    updateOrderStatus,
    reviews,
    addReview,
    deleteReview,
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAllRead,
    clearNotifications,
    recentlyUpdatedStock
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}