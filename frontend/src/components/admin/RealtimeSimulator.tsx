import { RadioIcon } from 'lucide-react';
import { socketService } from '../../services/socket';
import { useStore } from '../../contexts/StoreContext';
import { Button } from '../ui/Button';

/**
 * Demo control panel that fires the same events the Socket.IO server will emit.
 * The UI updates instantly — no page refresh, no direct coupling to components.
 */
export function RealtimeSimulator() {
  const { products, orders } = useStore();

  const simulateStock = () => {
    const target = products.find((p) => p.stock > 1);
    if (!target) return;
    socketService.emit('productStockUpdated', {
      productId: target.id,
      productName: target.name,
      stock: target.stock - 1
    });
  };

  const simulateStatus = () => {
    const target = orders.find((o) => o.status === 'Processing');
    if (!target) return;
    socketService.emit('orderStatusUpdated', { orderId: target.id, status: 'Shipped' });
  };

  const simulateOrder = () => {
    socketService.emit('newOrder', {
      orderId: 'SC-2026-1025',
      customerName: 'Nethmi Fernando',
      total: 74990
    });
    socketService.emit('newNotification', {
      id: `n-${Date.now()}`,
      type: 'order',
      message: 'New order #SC-2026-1025 received.'
    });
  };

  return (
    <section className="rounded-2xl border border-primary-200 bg-primary-50/60 p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
          <RadioIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-ink">Realtime channel</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
            Connected to the local event bus. Fire an event to see the store update live — this is
            the same contract the Socket.IO backend will use.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={simulateStock}>
              productStockUpdated
            </Button>
            <Button size="sm" variant="outline" onClick={simulateStatus}>
              orderStatusUpdated
            </Button>
            <Button size="sm" variant="outline" onClick={simulateOrder}>
              newOrder + notification
            </Button>
          </div>
        </div>
      </div>
    </section>);

}