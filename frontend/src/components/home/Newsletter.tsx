import React, { useState } from 'react';
import { CheckCircle2Icon, MailIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { api } from '../../services/api';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    await api.subscribeNewsletter(email);
    setStatus('done');
  };

  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <div className="grid items-center gap-8 rounded-3xl border border-line bg-white px-6 py-10 sm:px-10 lg:grid-cols-2">
        <div>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <MailIcon className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-[28px] font-bold text-ink">Stay Updated</h2>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Get the latest deals, product launches and exclusive offers directly in your inbox.
          </p>
        </div>

        <div>
          {status === 'done' ?
          <div className="flex items-center gap-3 rounded-2xl border border-success-100 bg-success-50 px-5 py-4">
              <CheckCircle2Icon className="h-5 w-5 flex-shrink-0 text-success-600" />
              <p className="text-sm font-semibold text-success-600">
                You're subscribed. Watch your inbox for SmartCart deals.
              </p>
            </div> :

          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-ink-muted/80 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100" />
              
                {status === 'error' &&
              <p className="mt-1.5 text-[12px] font-medium text-danger-600">
                    Please enter a valid email address.
                  </p>
              }
              </div>
              <Button type="submit" size="lg" loading={status === 'loading'}>
                Subscribe
              </Button>
            </form>
          }
          <p className="mt-3 text-[12px] text-ink-muted">
            No spam. Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>);

}