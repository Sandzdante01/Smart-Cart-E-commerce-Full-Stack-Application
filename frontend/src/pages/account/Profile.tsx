import React, { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../contexts/StoreContext';

export function AccountProfile() {
  const { user } = useStore();
  const [values, setValues] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    location: user?.location ?? ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.firstName.trim()) next.firstName = 'First name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!/^\+?[\d\s]{9,}$/.test(values.phone)) next.phone = 'Enter a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated', { description: 'Your details have been saved.' });
    }, 600);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[26px] font-bold text-ink">My Profile</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          Keep your contact details current so deliveries reach you.
        </p>
      </div>

      <form onSubmit={save} className="rounded-2xl border border-line bg-white p-6" noValidate>
        <div className="flex items-center gap-4 border-b border-line pb-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-xl font-bold text-white">
            {user?.avatarInitials}
          </span>
          <div>
            <p className="text-base font-bold text-ink">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[13px] text-ink-muted">
              Customer since {user?.joined} · {user?.location}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            value={values.firstName}
            error={errors.firstName}
            onChange={(e) => setValues({ ...values, firstName: e.target.value })} />
          
          <Input
            label="Last Name"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })} />
          
          <Input
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })} />
          
          <Input
            label="Phone"
            type="tel"
            value={values.phone}
            error={errors.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })} />
          
          <div className="sm:col-span-2">
            <Input
              label="City"
              value={values.location}
              onChange={(e) => setValues({ ...values, location: e.target.value })} />
            
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-line pt-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            Save changes
          </Button>
        </div>
      </form>
    </div>);

}