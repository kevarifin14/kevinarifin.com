import { forwardRef, MouseEventHandler, ReactNode } from 'react';

import Spin from 'components/Spin';

export type ButtonProps = {
  type: 'primary' | 'secondary' | 'light',
  children: ReactNode,
  htmlType?: 'submit' | 'button',
  className?: string,
  loading?: boolean,
  disabled?: boolean,
  shape?: 'circle' | 'rounded',
  size?: 'lg',
  onClick?: MouseEventHandler<HTMLButtonElement>,
  block?: boolean,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    type, children, htmlType = 'button', className, loading, disabled, onClick, block, size,
  },
  ref,
) => {
  const primaryClassName = 'text-white bg-primary hover:bg-primary-dark focus:outline-none border-primary';
  const secondaryClassName = 'text-primary hover:bg-primary-lightest focus:outline-none border-primary-lightest bg-primary-lightest hover:bg-primary-lighter hover:border-primary-lighter';
  const lightClassName = 'text-dark bg-light hover:bg-light-200 focus:outline-none';

  const disabledClassName = 'opacity-50';
  const blockClassName = 'w-full';

  const buttonClassName = [
    'px-4', 'py-2',
    'inline-flex', 'items-center', 'justify-center', 'border',
    'rounded-md', 'shadow-sm', 'focus:outline-none', 'font-medium',
    'focus:ring-2', 'focus:ring-offset-2',
    type === 'primary' ? primaryClassName : '',
    type === 'secondary' ? secondaryClassName : '',
    type === 'light' ? lightClassName : '',
    loading || disabled ? disabledClassName : '',
    block ? blockClassName : '',
    size === 'lg' ? 'px-5 py-3' : '',
    className,
  ].join(' ');

  return (
    <button
      ref={ref}
      type={htmlType}
      className={buttonClassName}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading
        && (
          <Spin />
        )}
      {children}
    </button>
  );
});

export default Button;
