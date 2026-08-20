import { HeadphonesIcon, ShieldCheckIcon, TruckIcon, VerifiedIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const features = [
{
  icon: TruckIcon,
  title: 'Free Delivery',
  body: 'Free delivery on orders over Rs. 25,000'
},
{
  icon: ShieldCheckIcon,
  title: 'Secure Payments',
  body: 'Your transactions are protected with secure payment technology.'
},
{
  icon: VerifiedIcon,
  title: 'Genuine Products',
  body: '100% authentic products from trusted brands.'
},
{
  icon: HeadphonesIcon,
  title: 'Customer Support',
  body: 'Our support team is here to help you.'
}];


export function WhySmartCart() {
  return (
    <section className="mx-auto max-w-shell px-6 py-16">
      <SectionHeading
        align="center"
        title="Why SmartCart"
        subtitle="Everything we do is built around one promise — shop smarter, live better." />
      
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, body }) =>
        <div key={title} className="flex flex-col">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
          </div>
        )}
      </div>
    </section>);

}