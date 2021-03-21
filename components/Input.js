export default function Input({
  placeholder, type, required, value, onChange,
}) {
  return (
    <input
      className="outline-none sm:text-xl text-md col-span-1 mr-2 rounded-none border-b border-solid bg-transparent border-black"
      required={required}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
