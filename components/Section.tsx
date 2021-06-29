import { ReactNode } from 'react';

import { classNames } from 'utils/tailwind';

type SectionProps = {
  children: ReactNode,
  color?: string,
  className?: string,
}

export default function Section({ children, className, color }: SectionProps) {
  return (
    <section className={classNames(color, 'w-full')}>
      <div className={classNames('max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8', className)}>
        {children}
      </div>
    </section>
  );
}
