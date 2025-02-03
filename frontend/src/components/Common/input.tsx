import React from 'react';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
>(({ className, ...props }, ref) => {
  return <input ref={ref} className={`border rounded-md p-2 ${className}`} {...props} />;
});