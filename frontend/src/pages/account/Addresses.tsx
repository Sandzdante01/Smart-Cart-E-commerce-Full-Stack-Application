import { useState } from 'react';
import { toast } from 'sonner';
import { MapPinIcon, PlusIcon } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { useStore } from '../../contexts/StoreContext';
import type { Address } from '../../types';

export function AccountAddresses() {
  const { user } = useStore();
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses ?? []);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ label: '', line1: '', city: '', postalCode: '' });

  const add = () => {
    if (!draft.label.trim() || !draft.line1.trim() || !draft.city.trim()) {
      toast.error('Please complete the label, street and city fields.');
      return;
    }
    setAddresses((prev) => [
    ...prev,
    {
      id: `a-${Date.now()}`,
      label: draft.label,
      line1: draft.line1,
      city: draft.city,
      province: 'Western Province',
      postalCode: draft.postalCode || '00300',
      country: 'Sri Lanka',
      isDefault: prev.length === 0
    }]
    );
    setDraft({ label: '', line1: '', city: '', postalCode: '' });
    setOpen(false);
    toast.success('Address added');
  };

  const makeDefault = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success('Default address updated');
  };

  const remove = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast('Address removed');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold text-ink">Addresses</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            Saved addresses make checkout faster.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Add address
        </Button>
      </div>

      {addresses.length === 0 ?
      <EmptyState
        icon={<MapPinIcon className="h-6 w-6" />}
        title="No saved addresses"
        message="Add a delivery address so we can pre-fill it at checkout."
        actionLabel="Add address"
        onAction={() => setOpen(true)} /> :


      <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) =>
        <article key={address.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold text-ink">{address.label}</p>
                {address.isDefault && <Badge tone="primary">Default</Badge>}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {address.line1}
                <br />
                {address.city}, {address.province}
                <br />
                {address.postalCode}, {address.country}
              </p>
              <div className="mt-5 flex gap-2">
                {!address.isDefault &&
            <Button size="sm" variant="outline" onClick={() => makeDefault(address.id)}>
                    Make default
                  </Button>
            }
                <Button size="sm" variant="ghost" onClick={() => remove(address.id)}>
                  Remove
                </Button>
              </div>
            </article>
        )}
        </div>
      }

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add a new address"
        footer={
        <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={add}>Save address</Button>
          </>
        }>
        
        <div className="space-y-4">
          <Input
            label="Label"
            placeholder="Home"
            value={draft.label}
            onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
          
          <Input
            label="Street address"
            placeholder="No. 45, Galle Road"
            value={draft.line1}
            onChange={(e) => setDraft({ ...draft, line1: e.target.value })} />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="City"
              placeholder="Colombo 03"
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            
            <Input
              label="Postal Code"
              placeholder="00300"
              value={draft.postalCode}
              onChange={(e) => setDraft({ ...draft, postalCode: e.target.value })} />
            
          </div>
        </div>
      </Modal>
    </div>);

}