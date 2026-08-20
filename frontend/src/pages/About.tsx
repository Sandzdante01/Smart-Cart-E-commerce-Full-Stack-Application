import { BuildingIcon, HeartHandshakeIcon, RocketIcon, UsersIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Testimonials } from '../components/home/Testimonials';
import { WhySmartCart } from '../components/home/WhySmartCart';
import { company } from '../data/company';
import { productImages } from '../data/products';

const stats = [
{ label: 'Customers served', value: '12,400+' },
{ label: 'Products in catalogue', value: '124' },
{ label: 'Brand partners', value: '32' },
{ label: 'Districts delivered to', value: '25' }];


const values = [
{
  icon: RocketIcon,
  title: 'Fast, everywhere',
  body: 'Same-day dispatch in Colombo and 2–3 day delivery to every district in Sri Lanka.'
},
{
  icon: HeartHandshakeIcon,
  title: 'Genuine only',
  body: 'Every unit is sourced through authorised channels and comes with local warranty support.'
},
{
  icon: UsersIcon,
  title: 'Built for our customers',
  body: 'Students, professionals, gamers and creators shape what we stock next.'
}];


export function About() {
  return (
    <>
      <PageHeader
        title="About SmartCart"
        subtitle="Shop smarter. Live better. We are a Colombo-based technology retailer helping Sri Lanka buy genuine devices with confidence."
        crumbs={[{ label: 'About' }]} />
      

      <section className="mx-auto max-w-shell px-6 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary-600">
              Our story
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-ink">
              Technology retail that Sri Lankans can actually trust
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
              <p>
                {company.legalName} started in {company.city} with a simple frustration: buying a
                laptop or a phone locally meant unclear warranties, grey imports and inconsistent
                pricing.
              </p>
              <p>
                Today we operate a single, carefully curated catalogue of electronics and
                accessories — every item authorised, warranty-backed and priced transparently in
                Sri Lankan Rupees.
              </p>
              <p>
                Our showroom at {company.address} is open {company.hours}, and our support team is
                reachable at {company.supportEmail}.
              </p>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map((stat) =>
              <div key={stat.label}>
                  <dt className="text-[13px] text-ink-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-extrabold text-ink">{stat.value}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-slate-50">
            <img
              src={productImages.hero}
              alt="A selection of technology products stocked by SmartCart"
              className="h-full w-full object-cover" />
            
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14">
        <div className="mx-auto max-w-shell px-6">
          <SectionHeading title="What we stand for" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) =>
            <div key={title} className="rounded-2xl border border-line p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <WhySmartCart />

      <section className="mx-auto max-w-shell px-6 pb-4">
        <div className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-8 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <BuildingIcon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-ink">Visit our Colombo showroom</h3>
            <p className="mt-1 text-sm text-ink-soft">
              {company.address} · {company.phone} · {company.hours}
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
    </>);

}