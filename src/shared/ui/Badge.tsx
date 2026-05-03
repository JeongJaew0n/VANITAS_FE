import type { HTMLAttributes, ReactNode, Ref } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  children: ReactNode;
}

export function Badge({ ref, className = '', children, ...props }: BadgeProps) {
  return (
    <span ref={ref} className={`ui-badge ${className}`} {...props}>
      {children}
    </span>
  );
}
