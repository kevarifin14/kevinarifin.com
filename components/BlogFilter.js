export default function BlogFilter({
  active, value, label, onClick, className,
}) {
  return (
    <span
      className={[
        'py-1 px-4 cursor-pointer border border-solid border-primary rounded-md blog-filter',
        active == value ? 'bg-primary text-white' : 'text-primary',
        className,
      ].join(' ')}
      onClick={onClick}
    >
      {label}
    </span>
  );
}
