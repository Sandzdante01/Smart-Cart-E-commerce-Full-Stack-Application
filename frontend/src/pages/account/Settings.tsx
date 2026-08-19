import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { classNames } from '../../utils/format';

interface Toggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const initialToggles: Toggle[] = [
{
  id: 'order-updates',
  label: 'Order updates',
  description: 'Email and SMS alerts when your order status changes.',
  enabled: true
},
{
  id: 'price-drops',
  label: 'Wishlist price drops',
  description: 'Tell me when something on my wishlist gets cheaper.',
  enabled: true
},
{
  id: 'newsletter',
  label: 'Deals newsletter',
  description: 'Weekly flash sales and new arrivals.',
  enabled: false
},
{
  id: 'reviews',
  label: 'Review reminders',
  description: 'Remind me to review products after delivery.',
  enabled: true
}];


export function AccountSettings() {
  const [toggles, setToggles] = useState(initialToggles);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  const flip = (id: string) =>
  setToggles((prev) => prev.map((t) => t.id === id ? { ...t, enabled: !t.enabled } : t));

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    setPasswords({ current: '', next: '', confirm: '' });
    toast.success('Password updated');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[26px] font-bold text-ink">Settings</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Control notifications, preferences and account security.
        </p>
      </div>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Notifications</h2>
        <ul className="mt-4 divide-y divide-line">
          {toggles.map((toggle) =>
          <li key={toggle.id} className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold text-ink">{toggle.label}</p>
                <p className="mt-0.5 text-[13px] text-ink-soft">{toggle.description}</p>
              </div>
              <button
              type="button"
              role="switch"
              aria-checked={toggle.enabled}
              aria-label={toggle.label}
              onClick={() => flip(toggle.id)}
              className={classNames(
                'relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ease-smooth',
                toggle.enabled ? 'bg-primary-600' : 'bg-slate-300'
              )}>
              
                <span
                className={classNames(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-smooth',
                  toggle.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                )} />
              
              </button>
            </li>
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Preferences</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Select
            label="Currency"
            options={[{ label: 'LKR (Rs.) — Sri Lankan Rupee', value: 'LKR' }]}
            value="LKR"
            onChange={() => undefined} />
          
          <Select
            label="Language"
            options={[
            { label: 'English', value: 'en' },
            { label: 'සිංහල', value: 'si' },
            { label: 'தமிழ்', value: 'ta' }]
            }
            defaultValue="en" />
          
        </div>
      </section>

      <form onSubmit={changePassword} className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold text-ink">Change password</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Input
            label="Current password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          
          <Input
            label="New password"
            type="password"
            value={passwords.next}
            onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} />
          
          <Input
            label="Confirm password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          
        </div>
        <div className="mt-6 flex justify-end border-t border-line pt-6">
          <Button type="submit">Update password</Button>
        </div>
      </form>
    </div>);

}