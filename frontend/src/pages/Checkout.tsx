import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BanknoteIcon,
  BuildingIcon,
  CheckIcon,
  CreditCardIcon,
  ShoppingCartIcon } from
'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useStore } from '../contexts/StoreContext';
import { classNames, formatLKR } from '../utils/format';

const steps = ['Information', 'Shipping', 'Payment', 'Confirmation'] as const;
type Step = (typeof steps)[number];

const paymentMethods = [
{
  id: 'Credit / Debit Card',
  icon: CreditCardIcon,
  description: 'Visa, Mastercard and Amex. Secured by 3D Secure.'
},
{
  id: 'Cash on Delivery',
  icon: BanknoteIcon,
  description: 'Pay the courier in cash when your order arrives.'
},
{
  id: 'Bank Transfer',
  icon: BuildingIcon,
  description: 'Transfer to our Commercial Bank account and upload the slip.'
}];


const provinces = [
'Western Province',
'Central Province',
'Southern Province',
'Northern Province',
'Eastern Province',
'North Western Province',
'North Central Province',
'Uva Province',
'Sabaragamuwa Province'].
map((p) => ({ label: p, value: p }));

export function Checkout() {
  const { cartLines, totals, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('Information');
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [info, setInfo] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}` : 'Kasun Perera',
    email: user?.email ?? 'kasun@example.com',
    phone: user?.phone ?? '+94 77 123 4567'
  });

  const [shipping, setShipping] = useState({
    address: '45, Galle Road',
    city: 'Colombo',
    province: 'Western Province',
    postalCode: '00300',
    country: 'Sri Lanka'
  });

  const [payment, setPayment] = useState('Cash on Delivery');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  if (cartLines.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: 'Checkout' }]} />
        <div className="mx-auto max-w-shell px-6 py-16">
          <EmptyState
            icon={<ShoppingCartIcon className="h-6 w-6" />}
            title="There is nothing to check out"
            message="Add a product to your cart and we'll walk you through delivery and payment."
            actionLabel="Browse products"
            actionTo="/shop" />
          
        </div>
      </>);

  }

  const stepIndex = steps.indexOf(step);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (step === 'Information') {
      if (!info.fullName.trim()) next.fullName = 'Full name is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) next.email = 'Enter a valid email address.';
      if (!/^\+?[\d\s]{9,}$/.test(info.phone)) next.phone = 'Enter a valid phone number.';
    }
    if (step === 'Shipping') {
      if (!shipping.address.trim()) next.address = 'Street address is required.';
      if (!shipping.city.trim()) next.city = 'City is required.';
      if (!/^\d{5}$/.test(shipping.postalCode)) next.postalCode = 'Enter a 5 digit postal code.';
    }
    if (step === 'Payment' && payment === 'Credit / Debit Card') {
      if (card.number.replace(/\s/g, '').length < 12) next.number = 'Enter a valid card number.';
      if (!card.name.trim()) next.name = 'Name on card is required.';
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) next.expiry = 'Use MM/YY format.';
      if (!/^\d{3,4}$/.test(card.cvc)) next.cvc = 'Enter the 3 digit CVC.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setStep(steps[Math.min(steps.length - 1, stepIndex + 1)]);
  };

  const back = () => setStep(steps[Math.max(0, stepIndex - 1)]);

  const submitOrder = async () => {
    setPlacing(true);
    const address = `${shipping.address}, ${shipping.city}, ${shipping.province}, ${shipping.postalCode}, ${shipping.country}`;
    try {
      const order = await placeOrder({ payment, address });
      setPlacing(false);
      navigate('/order-success', { state: { orderId: order.id } });
    } catch (err: any) {
      setPlacing(false);
      toast.error(err.message || 'Failed to place order.');
    }
  };

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
        <ol className="mb-8 grid gap-3 sm:grid-cols-4">
          {steps.map((label, index) => {
            const done = index < stepIndex;
            const active = index === stepIndex;
            return (
              <li
                key={label}
                className={classNames(
                  'flex items-center gap-3 rounded-xl border px-4 py-3',
                  active ?
                  'border-primary-200 bg-primary-50' :
                  done ?
                  'border-success-100 bg-success-50' :
                  'border-line bg-white'
                )}>
                
                <span
                  className={classNames(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
                    active ?
                    'bg-primary-600 text-white' :
                    done ?
                    'bg-success-500 text-white' :
                    'bg-slate-100 text-ink-muted'
                  )}>
                  
                  {done ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span
                  className={classNames(
                    'text-[13px] font-bold',
                    active ? 'text-primary-700' : done ? 'text-success-600' : 'text-ink-muted'
                  )}>
                  
                  {label}
                </span>
              </li>);

          })}
        </ol>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            {step === 'Information' &&
            <div>
                <h2 className="text-xl font-bold text-ink">Contact information</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  We'll send order updates to this email and phone number.
                </p>
                <div className="mt-6 space-y-4">
                  <Input
                  label="Full Name"
                  value={info.fullName}
                  error={errors.fullName}
                  onChange={(e) => setInfo({ ...info, fullName: e.target.value })} />
                
                  <Input
                  label="Email"
                  type="email"
                  value={info.email}
                  error={errors.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })} />
                
                  <Input
                  label="Phone"
                  type="tel"
                  value={info.phone}
                  error={errors.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                
                </div>
              </div>
            }

            {step === 'Shipping' &&
            <div>
                <h2 className="text-xl font-bold text-ink">Shipping address</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  We deliver island-wide. Colombo orders before 2:00 PM ship the same day.
                </p>
                <div className="mt-6 space-y-4">
                  <Input
                  label="Address"
                  value={shipping.address}
                  error={errors.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                    label="City"
                    value={shipping.city}
                    error={errors.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                  
                    <Select
                    label="Province"
                    options={provinces}
                    value={shipping.province}
                    onChange={(e) => setShipping({ ...shipping, province: e.target.value })} />
                  
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                    label="Postal Code"
                    value={shipping.postalCode}
                    error={errors.postalCode}
                    onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} />
                  
                    <Select
                    label="Country"
                    options={[{ label: 'Sri Lanka', value: 'Sri Lanka' }]}
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
                  
                  </div>
                </div>
              </div>
            }

            {step === 'Payment' &&
            <div>
                <h2 className="text-xl font-bold text-ink">Payment method</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  This is a demo storefront — no real payment is processed.
                </p>

                <div className="mt-6 space-y-3">
                  {paymentMethods.map(({ id, icon: Icon, description }) =>
                <label
                  key={id}
                  className={classNames(
                    'flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors duration-150 ease-smooth',
                    payment === id ?
                    'border-primary-500 bg-primary-50/60 ring-1 ring-primary-200' :
                    'border-line bg-white hover:border-primary-200'
                  )}>
                  
                      <input
                    type="radio"
                    name="payment"
                    checked={payment === id}
                    onChange={() => setPayment(id)}
                    className="mt-1 h-4 w-4 border-line text-primary-600 focus:ring-primary-500" />
                  
                      <span
                    className={classNames(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
                      payment === id ? 'bg-primary-600 text-white' : 'bg-slate-100 text-ink-soft'
                    )}>
                    
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-ink">{id}</span>
                        <span className="mt-0.5 block text-[13px] text-ink-soft">{description}</span>
                      </span>
                    </label>
                )}
                </div>

                {payment === 'Credit / Debit Card' &&
              <div className="mt-6 space-y-4 rounded-xl border border-line bg-canvas p-5">
                    <Input
                  label="Card number"
                  placeholder="4111 1111 1111 1111"
                  value={card.number}
                  error={errors.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })} />
                
                    <Input
                  label="Name on card"
                  placeholder="Kasun Perera"
                  value={card.name}
                  error={errors.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })} />
                
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                    label="Expiry"
                    placeholder="09/28"
                    value={card.expiry}
                    error={errors.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                  
                      <Input
                    label="CVC"
                    placeholder="123"
                    value={card.cvc}
                    error={errors.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
                  
                    </div>
                  </div>
              }
              </div>
            }

            {step === 'Confirmation' &&
            <div>
                <h2 className="text-xl font-bold text-ink">Review your order</h2>
                <p className="mt-1.5 text-sm text-ink-soft">
                  Check everything below, then place your order.
                </p>

                <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl border border-line p-4">
                    <dt className="text-[12px] font-bold uppercase tracking-wide text-ink-muted">
                      Contact
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {info.fullName}
                      <br />
                      {info.email}
                      <br />
                      {info.phone}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-line p-4">
                    <dt className="text-[12px] font-bold uppercase tracking-wide text-ink-muted">
                      Shipping to
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {shipping.address}
                      <br />
                      {shipping.city}, {shipping.province}
                      <br />
                      {shipping.postalCode}, {shipping.country}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-line p-4 sm:col-span-2">
                    <dt className="text-[12px] font-bold uppercase tracking-wide text-ink-muted">
                      Payment
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-ink">{payment}</dd>
                  </div>
                </dl>

                <ul className="mt-6 divide-y divide-line rounded-xl border border-line">
                  {cartLines.map((line) =>
                <li key={line.productId} className="flex items-center gap-4 p-4">
                      <img
                    src={line.product.images[0]}
                    alt=""
                    className="h-14 w-14 rounded-lg border border-line object-cover" />
                  
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{line.product.name}</p>
                        <p className="text-[13px] text-ink-muted">Qty {line.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-ink">
                        {formatLKR(line.product.price * line.quantity)}
                      </p>
                    </li>
                )}
                </ul>
              </div>
            }

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
              <Button variant="ghost" onClick={back} disabled={stepIndex === 0}>
                <ArrowLeftIcon className="h-4 w-4" />
                Back
              </Button>
              {step === 'Confirmation' ?
              <Button size="lg" loading={placing} onClick={submitOrder}>
                  Place Order
                </Button> :

              <Button size="lg" onClick={next}>
                  Continue to {steps[stepIndex + 1]}
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              }
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-bold text-ink">Order Summary</h2>

              <ul className="mt-4 space-y-3">
                {cartLines.map((line) =>
                <li key={line.productId} className="flex items-start justify-between gap-3">
                    <span className="min-w-0 text-[13px] text-ink-soft">
                      <span className="block truncate font-semibold text-ink">
                        {line.product.name}
                      </span>
                      Qty {line.quantity}
                    </span>
                    <span className="whitespace-nowrap text-[13px] font-bold text-ink">
                      {formatLKR(line.product.price * line.quantity)}
                    </span>
                  </li>
                )}
              </ul>

              <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="font-semibold text-ink">{formatLKR(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Discount</dt>
                  <dd className="font-semibold text-success-600">−{formatLKR(totals.discount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="font-semibold text-ink">
                    {totals.shipping === 0 ? 'Free' : formatLKR(totals.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3">
                  <dt className="text-base font-bold text-ink">Total</dt>
                  <dd className="text-xl font-extrabold text-ink">{formatLKR(totals.total)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>);

}