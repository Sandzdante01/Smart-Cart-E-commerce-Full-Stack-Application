import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';
import { Logo } from '../components/layout/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useStore } from '../contexts/StoreContext';
import { demoCredentials } from '../data/users';
import { productImages } from '../data/products';

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from;

  const [email, setEmail] = useState('kasun@example.com');
  const [password, setPassword] = useState('smartcart');
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{email?: string;password?: string;form?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address.';
    if (password.length < 4) next.password = 'Password must be at least 4 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(from ?? (user.role === 'admin' ? '/admin' : '/account'), { replace: true });
    } catch (error) {
      setErrors({ form: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <img
          src={productImages.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40" />
        
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="dark" showTagline />
          <div>
            <h2 className="text-[34px] font-extrabold leading-tight text-white">
              Genuine technology,
              <br />
              delivered island-wide.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-300">
              Sign in to track your orders, keep your wishlist in sync and check out faster with
              saved addresses.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2.5">
                <TruckIcon className="h-4 w-4 text-primary-400" />
                Free delivery on orders over Rs. 25,000
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheckIcon className="h-4 w-4 text-primary-400" />
                Warranty-backed products from trusted brands
              </li>
            </ul>
          </div>
          <p className="text-[13px] text-slate-500">
            SmartCart Technologies · Colombo, Sri Lanka
          </p>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-white px-6 py-14">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>

          <h1 className="mt-8 text-[30px] font-bold text-ink lg:mt-0">Welcome back</h1>
          <p className="mt-2 text-[15px] text-ink-soft">Login to continue shopping.</p>

          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            {errors.form &&
            <div role="alert" className="rounded-xl border border-danger-100 bg-danger-50 px-4 py-3">
                <p className="text-[13px] font-semibold text-danger-600">{errors.form}</p>
              </div>
            }

            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              error={errors.email}
              icon={<MailIcon className="h-4 w-4" />}
              placeholder="kasun@example.com"
              onChange={(e) => setEmail(e.target.value)} />
            

            <Input
              label="Password"
              name="password"
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              error={errors.password}
              icon={<LockIcon className="h-4 w-4" />}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              trailing={
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:text-ink">
                
                  {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              } />
            

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-soft">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-500" />
                
                Remember me
              </label>
              <Link
                to="/contact"
                className="text-[13px] font-semibold text-primary-600 hover:text-primary-700">
                
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" fullWidth loading={loading}>
              Login
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-line bg-canvas p-4">
            <p className="text-[12px] font-bold uppercase tracking-wide text-ink-muted">
              Demo accounts
            </p>
            <ul className="mt-2.5 space-y-2">
              {demoCredentials.map((cred) =>
              <li key={cred.email} className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-ink">
                      {cred.label}
                    </span>
                    <span className="block truncate text-[12px] text-ink-muted">
                      {cred.email} · {cred.password}
                    </span>
                  </span>
                  <button
                  type="button"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.password);
                  }}
                  className="flex-shrink-0 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-semibold text-primary-700 transition-colors duration-150 ease-smooth hover:border-primary-300">
                  
                    Use
                  </button>
                </li>
              )}
            </ul>
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
              Create account
            </Link>
          </p>
        </div>
      </main>
    </div>);

}