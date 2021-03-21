export default function Button({
  children, onClick, type, className,
}) {
  return (
    <button
      className={[
        'cursor-pointer px-4 py-2 rounded text-lg text-gray-100 border-none bg-primary',
        className,
      ].join(' ')}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
