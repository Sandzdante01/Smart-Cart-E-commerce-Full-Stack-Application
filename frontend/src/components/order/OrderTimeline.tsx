import { CheckIcon } from 'lucide-react';
import { classNames } from '../../utils/format';
import type { OrderStatus } from '../../types';

const steps = [
{ label: 'Order Placed', description: 'We received your order and sent a confirmation email.' },
{ label: 'Order Confirmed', description: 'Payment method verified and stock reserved for you.' },
{ label: 'Processing', description: 'Your items are being picked and packed in Colombo.' },
{ label: 'Shipped', description: 'Handed to our courier partner for delivery.' },
{ label: 'Delivered', description: 'Signed for at your delivery address.' }];


const statusIndex: Record<OrderStatus, number> = {
  Pending: 1,
  Processing: 2,
  Shipped: 3,
  Delivered: 4,
  Cancelled: -1
};

export function OrderTimeline({ status }: {status: OrderStatus;}) {
  if (status === 'Cancelled') {
    return (
      <div className="rounded-2xl border border-danger-100 bg-danger-50 p-5">
        <p className="text-sm font-bold text-danger-600">Order cancelled</p>
        <p className="mt-1 text-[13px] text-ink-soft">
          This order was cancelled. Any payment made is refunded within 5 working days.
        </p>
      </div>);

  }

  const currentIndex = statusIndex[status];

  return (
    <ol className="relative">
      {steps.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;
        return (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
            {index < steps.length - 1 &&
            <span
              aria-hidden="true"
              className={classNames(
                'absolute left-[15px] top-8 h-[calc(100%-24px)] w-0.5',
                done ? 'bg-success-500' : 'bg-line'
              )} />

            }
            <span
              className={classNames(
                'relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2',
                done ?
                'border-success-500 bg-success-500 text-white' :
                current ?
                'border-primary-600 bg-white text-primary-600' :
                'border-line bg-white text-ink-muted'
              )}>
              
              {done ?
              <CheckIcon className="h-4 w-4" /> :
              current ?
              <span className="h-2.5 w-2.5 rounded-full bg-primary-600" /> :

              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              }
            </span>
            <div className="pt-1">
              <p
                className={classNames(
                  'text-sm font-bold',
                  done || current ? 'text-ink' : 'text-ink-muted'
                )}>
                
                {step.label}
              </p>
              <p className="mt-0.5 text-[13px] text-ink-soft">{step.description}</p>
            </div>
          </li>);

      })}
    </ol>);

}