import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-mist bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] md:min-h-[40px]',
          error && 'border-danger focus:ring-danger',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-danger font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
