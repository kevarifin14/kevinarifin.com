import { classNames } from 'utils/tailwind';

type BlogFilterProps = {
  active?: boolean,
  label: string,
  onClick?: () => void,
  className?: string,
}

export default function BlogFilter({
  active, label, onClick, className,
}: BlogFilterProps) {
  return (
    <button
      className={classNames(
        'py-1 px-4 cursor-pointer border border-solid border-primary rounded-md blog-filter',
        active ? 'bg-primary text-white' : 'text-primary',
        className,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
