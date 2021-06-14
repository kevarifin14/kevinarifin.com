import { forwardRef, HTMLProps } from 'react';

import { classNames } from 'utils/tailwind';

interface InputProps extends HTMLProps<HTMLInputElement>{}

const Input = forwardRef<HTMLInputElement, InputProps>(({ size, ...inputProps }, ref) => {
  const inputClassName = classNames(
    'focus:outline-none', 'w-full', 'border', 'bg-light',
    'rounded-md', 'block', 'text-gray-900', 'placeholder-gray-500', 'focus:ring-1',
    'focus:border-primary', 'focus:ring-primary',
    'px-5', 'py-3',
    inputProps.className,
  );

  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...inputProps}
          className={inputClassName}
          ref={ref}
          style={{ WebkitAppearance: 'none' }}
        />
      </div>
    </div>
  );
});

export default Input;
