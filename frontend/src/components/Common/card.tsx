import React from 'react';

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};