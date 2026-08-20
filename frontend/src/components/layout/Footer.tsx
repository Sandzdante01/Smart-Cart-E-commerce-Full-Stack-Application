import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon } from
'lucide-react';
import { company, mainNav } from '../../data/company';

const serviceLinks = [
{ label: 'My Account', to: '/account' },
{ label: 'Orders', to: '/account/orders' },
{ label: 'Shipping', to: '/about' },
{ label: 'Returns', to: '/about' },
{ label: 'FAQs', to: '/contact' }];


const socials = [
{ label: 'Facebook', icon: FacebookIcon },
{ label: 'Instagram', icon: InstagramIcon },
{ label: 'X', icon: TwitterIcon },
{ label: 'LinkedIn', icon: LinkedinIcon },
{ label: 'YouTube', icon: YoutubeIcon }];


export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-ink text-slate-300">
      <div className="mx-auto grid max-w-shell gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[20px] font-extrabold tracking-tight text-white">
            Smart<span className="text-primary-400">Cart</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Shop smarter. Live better. Genuine technology from trusted brands, delivered island-wide
            from Colombo.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ label, icon: Icon }) =>
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors duration-150 ease-smooth hover:bg-primary-600 hover:text-white">
              
                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((item) =>
            <li key={item.to}>
                <Link
                to={item.to}
                className="text-sm text-slate-400 transition-colors duration-150 ease-smooth hover:text-white">
                
                  {item.label}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Customer Service</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((item) =>
            <li key={item.label}>
                <Link
                to={item.to}
                className="text-sm text-slate-400 transition-colors duration-150 ease-smooth hover:text-white">
                
                  {item.label}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
              {company.address}
            </li>
            <li className="flex gap-2.5">
              <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
              {company.phone}
            </li>
            <li className="flex gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-400" />
              {company.supportEmail}
            </li>
            <li className="pt-1 text-slate-500">{company.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-shell flex-col gap-2 px-6 py-5 text-[13px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{company.copyright}</p>
          <p>All prices shown in Sri Lankan Rupees (LKR).</p>
        </div>
      </div>
    </footer>);

}