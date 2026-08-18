import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { classNames } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
  'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600 shadow-sm',
  secondary:
  'bg-electric-500 text-white hover:bg-electric-600 focus-visible:outline-electric-500 shadow-sm',
  outline:
  'border border-line bg-white text-ink hover:border-primary-300 hover:text-primary-700 focus-visible:outline-primary-600',
  ghost: 'text-ink-soft hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-primary-600',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus-visible:outline-danger-500',
  success: 'bg-success-500 text-white hover:bg-success-600 focus-visible:outline-success-500',
  dark: 'bg-ink text-white hover:bg-black focus-visible:outline-ink'
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl'
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
  to?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  children,
  to,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = classNames(
    'inline-flex items-center justify-center font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>);

  }

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>);

}