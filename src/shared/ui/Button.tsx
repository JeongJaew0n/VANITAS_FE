import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  ref,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button ref={ref} className={`ui-button ui-button-${variant} ui-button-${size} ${className}`} {...props}>
      {children}
    </button>
  );
}
