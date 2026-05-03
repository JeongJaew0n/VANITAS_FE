import type { InputHTMLAttributes, Ref } from 'react';

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export function PixelInput({ ref, className = '', ...props }: PixelInputProps) {
  return <input ref={ref} className={`pixel-input ${className}`} {...props} />;
}
