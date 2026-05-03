import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
  pendingLabel?: ReactNode;
}

export function SubmitButton({
  ref,
  className = '',
  children,
  pendingLabel = '...',
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      className={className}
      type="submit"
      disabled={pending || disabled}
      aria-busy={pending}
      {...props}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
