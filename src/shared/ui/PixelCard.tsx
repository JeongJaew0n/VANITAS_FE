import type { HTMLAttributes, ReactNode, Ref } from 'react';

interface PixelCardProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
}

export function PixelCard({ ref, className = '', children, ...props }: PixelCardProps) {
  return (
    <div ref={ref} className={`pixel-card ${className}`} {...props}>
      {children}
    </div>
  );
}
