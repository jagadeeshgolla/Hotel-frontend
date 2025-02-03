import React from 'react';

export const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`bg-blue-500 text-white rounded-md p-2 ${className}`} {...props}>
      {children}
    </button>
  );
};