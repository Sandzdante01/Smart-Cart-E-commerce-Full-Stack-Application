import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { company } from '../../data/company';
import { classNames } from '../../utils/format';

export function AdminSettings() {
  const [store, setStore] = useState({
    name: company.legalName,
    email: company.email,
    support: company.supportEmail,
    phone: company.phone,
    address: company.address,
    threshold: String(company.freeShippingThreshold),
    shipping: String(company.standardShipping)
  });
  const [flags, setFlags] = useState({
    cod: true,
    card: true,
    bank: true,
    reviewModeration: false
  });
  const [saving, setSaving] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Store settings saved');
    }, 600);
  };

  const toggles = [
  { key: 'cod' as const, label: 'Cash on Delivery', description: 'Allow payment on arrival island-wide.' },
  { key: 'card' as const, label: 'Card payments', description: 'Visa, Mastercard and Amex via the payment gateway.' },
  { key: 'bank' as const, label: 'Bank transfer', description: 'Customers upload a deposit slip after checkout.' },
  {
    key: 'reviewModeration' as const,
    label: 'Moderate reviews',
    description: 'Hold new reviews for admin approval before publishing.'
  }];


  return (
    <form onSubmit={save} className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-ink">Settings</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Store details, delivery thresholds and payment options.
        </p>
      </div>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Store details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Store name"
            value={store.name}
            onChange={(e) => setStore({ ...store, name: e.target.value })} />
          
          <Input
            label="Phone"
            value={store.phone}
            onChange={(e) => setStore({ ...store, phone: e.target.value })} />
          
          <Input
            label="General email"
            value={store.email}
            onChange={(e) => setStore({ ...store, email: e.target.value })} />
          
          <Input
            label="Support email"
            value={store.support}
            onChange={(e) => setStore({ ...store, support: e.target.value })} />
          
          <div className="sm:col-span-2">
            <Input
              label="Address"
              value={store.address}
              onChange={(e) => setStore({ ...store, address: e.target.value })} />
            
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Delivery</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input
            label="Free delivery over (Rs.)"
            type="number"
            value={store.threshold}
            onChange={(e) => setStore({ ...store, threshold: e.target.value })} />
          
          <Input
            label="Standard delivery (Rs.)"
            type="number"
            value={store.shipping}
            onChange={(e) => setStore({ ...store, shipping: e.target.value })} />
          
          <Select
            label="Currency"
            options={[{ label: 'LKR (Rs.)', value: 'LKR' }]}
            value="LKR"
            onChange={() => undefined} />
          
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Payments & moderation</h2>
        <ul className="mt-4 divide-y divide-line">
          {toggles.map((toggle) =>
          <li
            key={toggle.key}
            className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
            
              <div>
                <p className="text-sm font-semibold text-ink">{toggle.label}</p>
                <p className="mt-0.5 text-[13px] text-ink-soft">{toggle.description}</p>
              </div>
              <button
              type="button"
              role="switch"
              aria-checked={flags[toggle.key]}
              aria-label={toggle.label}
              onClick={() => setFlags((prev) => ({ ...prev, [toggle.key]: !prev[toggle.key] }))}
              className={classNames(
                'relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ease-smooth',
                flags[toggle.key] ? 'bg-primary-600' : 'bg-slate-300'
              )}>
              
                <span
                className={classNames(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-smooth',
                  flags[toggle.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                )} />
              
              </button>
            </li>
          )}
        </ul>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" loading={saving}>
          Save settings
        </Button>
      </div>
    </form>);

}