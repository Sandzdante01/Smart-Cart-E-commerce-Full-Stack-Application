import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Logo } from '../components/layout/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useStore } from '../contexts/StoreContext';
import { productImages } from '../data/products';
import { classNames } from '../utils/format';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

const empty: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirm: ''
};

function strengthOf(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

const strengthMeta = [
{ label: 'Too short', color: 'bg-danger-500', text: 'text-danger-600' },
{ label: 'Weak', color: 'bg-danger-500', text: 'text-danger-600' },
{ label: 'Fair', color: 'bg-warning-500', text: 'text-warning-600' },
{ label: 'Good', color: 'bg-electric-500', text: 'text-electric-600' },
{ label: 'Strong', color: 'bg-success-500', text: 'text-success-600' }];


export function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>(empty);
  const [terms, setTerms] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues | 'terms', string>>>({});
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => strengthOf(values.password), [values.password]);
  const meta = strengthMeta[score];

  const set = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
  setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.firstName.trim()) next.firstName = 'First name is required.';
    if (!values.lastName.trim()) next.lastName = 'Last name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!/^\+?[\d\s]{9,}$/.test(values.phone)) next.phone = 'Enter a valid phone number.';
    if (values.password.length < 8) next.password = 'Use at least 8 characters.';
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.';
    if (!terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    await register({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim()
    });
    setLoading(false);
    navigate('/account', { replace: true });
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src={productImages.macbook}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30" />
        
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="dark" showTagline />
          <div>
            <h2 className="text-[34px] font-extrabold leading-tight text-white">
              Create your
              <br />
              SmartCart account
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
              One account for orders, wishlists, reviews and faster checkout across every SmartCart
              device.
            </p>
          </div>
          <p className="text-[13px] text-slate-500">SmartCart Technologies · Colombo, Sri Lanka</p>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-white px-6 py-14">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>

          <h1 className="mt-8 text-[30px] font-bold text-ink lg:mt-0">Create account</h1>
          <p className="mt-2 text-[15px] text-ink-soft">
            Join SmartCart — it takes less than a minute.
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First Name"
                name="firstName"
                value={values.firstName}
                error={errors.firstName}
                placeholder="Kasun"
                onChange={set('firstName')} />
              
              <Input
                label="Last Name"
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                placeholder="Perera"
                onChange={set('lastName')} />
              
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              placeholder="kasun@example.com"
              onChange={set('email')} />
            

            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={values.phone}
              error={errors.phone}
              placeholder="+94 77 123 4567"
              onChange={set('phone')} />
            

            <div>
              <Input
                label="Password"
                name="password"
                type={show ? 'text' : 'password'}
                value={values.password}
                error={errors.password}
                placeholder="At least 8 characters"
                onChange={set('password')}
                trailing={
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:text-ink">
                  
                    {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                } />
              
              {values.password.length > 0 &&
              <div className="mt-2 flex items-center gap-3">
                  <div className="flex flex-1 gap-1">
                    {[0, 1, 2, 3].map((i) =>
                  <span
                    key={i}
                    className={classNames(
                      'h-1.5 flex-1 rounded-full transition-colors duration-200 ease-smooth',
                      i < score ? meta.color : 'bg-slate-200'
                    )} />

                  )}
                  </div>
                  <span className={classNames('text-[12px] font-semibold', meta.text)}>
                    {meta.label}
                  </span>
                </div>
              }
            </div>

            <Input
              label="Confirm Password"
              name="confirm"
              type={show ? 'text' : 'password'}
              value={values.confirm}
              error={errors.confirm}
              placeholder="Re-enter your password"
              onChange={set('confirm')} />
            

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-ink-soft">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500" />
                
                I agree to the SmartCart Terms of Service and Privacy Policy.
              </label>
              {errors.terms &&
              <p className="mt-1.5 text-[12px] font-medium text-danger-600">{errors.terms}</p>
              }
            </div>

            <Button type="submit" size="lg" fullWidth loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>);

}