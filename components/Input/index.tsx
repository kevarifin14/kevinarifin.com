import { forwardRef, HTMLProps } from "react";
import { ErrorOption } from "react-hook-form";
import {
  HiExclamationCircle,
  HiOutlineQuestionMarkCircle,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import { v4 as uuid } from "uuid";

// import { ExclamationCircleIcon } from "../Icon";
import { Tooltip } from "components/Tooltip";

import { errorTypeToMessage } from "lib/forms";
import {
  classNames,
  sizeToFontSizeClassName,
  sizeToPaddingClassName,
  TailwindSize,
} from "lib/tailwind";

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
  size?: TailwindSize;
  error?: ErrorOption;
  suffix?: string;
  help?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", label, suffix, help, error, ...inputProps }, ref) => {
    const paddingClassName = sizeToPaddingClassName[size];
    const fontSizeClassName = sizeToFontSizeClassName[size];

    const inputClassName = classNames(
      "focus:outline-none w-full placeholder-gray-500 bg-transparent",
      paddingClassName,
      inputProps.className
    );

    const containerClassName = classNames(
      "flex items-center rounded-md overflow-hidden text-dark dark:text-light transition-colors border",
      "bg-light border-light-accent hover:bg-light-dark focus-within:bg-light-dark",
      "dark:border-dark-accent dark:bg-dark dark:hover:bg-dark-light dark:focus-within:bg-dark-light",
      fontSizeClassName
    );
    const id = uuid();

    return (
      <div className="w-full h-full">
        {label ||
          (help && (
            <div className="text-dark dark:text-light mb-1 flex items-center space-x-1">
              {label && (
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  htmlFor={id}
                >
                  {label}
                </label>
              )}

              {help && (
                <Tooltip text={help}>
                  <HiOutlineQuestionMarkCircle />
                </Tooltip>
              )}
            </div>
          ))}

        <div className="relative">
          <div className={containerClassName}>
            <input
              id={id}
              {...inputProps}
              className={inputClassName}
              ref={ref}
              style={{ WebkitAppearance: "none" }}
            />
            {suffix && <div>{suffix}</div>}
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error.message || errorTypeToMessage(error.type!)}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
