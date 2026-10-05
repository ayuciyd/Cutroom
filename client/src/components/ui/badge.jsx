import React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  accent: 'bg-accent/20 text-ink border-accent/40',
  secondary: 'bg-mist/30 text-ink border-mist',
  success: 'bg-success/10 text-success border-success/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  outline: 'bg-transparent text-ink border-mist',
};

export const Badge = ({
  className,
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants[variant] || badgeVariants.primary,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
