import { io } from 'socket.io-client';
import type { OrderStatus } from '../types';

export type SocketEventMap = {
  productStockUpdated: {productId: string;stock: number;productName: string;};
  orderStatusUpdated: {orderId: string;status: OrderStatus;};
  newOrder: {orderId: string;customerName: string;total: number;};
  newNotification: {
    id: string;
    type: 'order' | 'stock' | 'delivery' | 'customer';
    message: string;
  };
};

export type SocketEventName = keyof SocketEventMap;

type Handler<E extends SocketEventName> = (payload: SocketEventMap[E]) => void;

// Initialize socket.io-client (Vite proxy redirects '/socket.io' to backend server)
const socket = io({ autoConnect: false });

export const socketService = {
  get connected() {
    return socket.connected;
  },

  connect() {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  },

  on<E extends SocketEventName>(event: E, handler: Handler<E>) {
    socket.on(event, handler as any);
    return () => {
      socket.off(event, handler as any);
    };
  },

  emit<E extends SocketEventName>(event: E, payload: SocketEventMap[E]) {
    socket.emit(event, payload);
  }
};