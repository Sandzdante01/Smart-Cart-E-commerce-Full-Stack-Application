import React, { useState } from 'react';
import { CheckCircle2Icon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { company } from '../data/company';
import { api } from '../services/api';

const faqs = [
{
  q: 'How long does delivery take?',
  a: 'Colombo orders placed before 2:00 PM are dispatched the same day. Other districts receive orders within 2–3 working days.'
},
{
  q: 'Are your products covered by warranty?',
  a: 'Yes. Every product is sourced through authorised channels and includes local manufacturer or SmartCart warranty.'
},
{
  q: 'Can I pay cash on delivery?',
  a: 'Cash on Delivery is available island-wide for orders up to Rs. 500,000, alongside card payments and bank transfers.'
},
{
  q: 'What is your returns policy?',
  a: 'Unopened items can be returned within 7 days. Faulty items are replaced or repaired under warranty at no cost.'
}];


export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (values.message.trim().length < 10) next.message = 'Please add at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus('loading');
    await api.sendContactMessage(values);
    setStatus('done');
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions about a product, an order or a warranty claim? Our Colombo team responds within one working day."
        crumbs={[{ label: 'Contact' }]} />
      

      <div className="mx-auto max-w-shell px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">Send us a message</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              We reply to every message from {company.supportEmail}.
            </p>

            {status === 'done' ?
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success-100 bg-success-50 px-5 py-5">
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-600" />
                <div>
                  <p className="text-sm font-bold text-success-600">Message sent</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Thanks {values.name.split(' ')[0]} — our support team will reply to{' '}
                    {values.email} within one working day.
                  </p>
                </div>
              </div> :

            <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                  label="Full Name"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  placeholder="Kasun Perera"
                  onChange={(e) => setValues({ ...values, name: e.target.value })} />
                
                  <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  placeholder="kasun@example.com"
                  onChange={(e) => setValues({ ...values, email: e.target.value })} />
                
                </div>
                <Input
                label="Subject"
                name="subject"
                value={values.subject}
                placeholder="Order SC-2026-1024 delivery question"
                onChange={(e) => setValues({ ...values, subject: e.target.value })} />
              
                <div>
                  <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  
                    Message
                  </label>
                  <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues({ ...values, message: e.target.value })}
                  placeholder="How can we help?"
                  className={`w-full rounded-xl border bg-white p-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:outline-none focus:ring-4 ${
                  errors.message ?
                  'border-danger-500 focus:border-danger-500 focus:ring-danger-100' :
                  'border-line focus:border-primary-500 focus:ring-primary-100'}`
                  } />
                
                  {errors.message &&
                <p className="mt-1.5 text-[12px] font-medium text-danger-600">{errors.message}</p>
                }
                </div>
                <Button type="submit" size="lg" loading={status === 'loading'}>
                  Send message
                </Button>
              </form>
            }
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-base font-bold text-ink">Reach us directly</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span className="text-ink-soft">{company.address}</span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span className="text-ink-soft">{company.phone}</span>
                </li>
                <li className="flex gap-3">
                  <MailIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span className="text-ink-soft">
                    {company.email}
                    <br />
                    {company.supportEmail}
                  </span>
                </li>
                <li className="flex gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span className="text-ink-soft">{company.hours}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-base font-bold text-ink">Frequently asked</h2>
              <dl className="mt-4 divide-y divide-line">
                {faqs.map((faq) =>
                <div key={faq.q} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="text-sm font-semibold text-ink">{faq.q}</dt>
                    <dd className="mt-1 text-[13px] leading-relaxed text-ink-soft">{faq.a}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>);

}