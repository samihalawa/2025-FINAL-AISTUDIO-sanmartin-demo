
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'normal' | 'large';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', size = 'normal', ...props }) => {
  const sizeClasses = size === 'large' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';
  
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                bg-brand-primary text-white hover:bg-blue-700 focus:ring-brand-primary
                disabled:bg-gray-300 disabled:cursor-not-allowed ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
