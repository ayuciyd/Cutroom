import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary shadow-soft',
  secondary: 'bg-accent text-ink hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent shadow-soft',
  outline: 'border border-mist bg-transparent text-ink hover:bg-paper focus-visible:ring-2 focus-visible:ring-primary',
  ghost: 'bg-transparent text-ink hover:bg-paper focus-visible:ring-2 focus-visible:ring-primary',
  destructive: 'bg-danger text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-danger shadow-soft',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-md',
  lg: 'h-12 px-6 text-base rounded-md',
  icon: 'h-10 w-10 p-2 rounded-md justify-center items-center inline-flex',
};

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none min-h-[44px] md:min-h-[40px]',
        buttonVariants[variant] || buttonVariants.primary,
        buttonSizes[size] || buttonSizes.md,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
