export default function Section({
  children, className, size, color,
}) {
  const sectionClassName = [
    size ? `lg:max-w-${size}` : '',
    'lg:mx-auto',
    className,
  ].join(' ');

  return (
    <section className={[color].join(' ')}>
      <div className={sectionClassName}>
        {children}
      </div>
    </section>
  );
}
