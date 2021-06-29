import { classNames } from 'utils/tailwind';

import Section from './Section';
import SubscribeForm from './SubscribeForm';

type NewsletterSectionProps = {
  className?: string
}

export default function NewsletterSection({ className }: NewsletterSectionProps) {
  return (
    <Section className={classNames('py-16', className)} color="bg-gray-100">

      <div className="lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1 space-y-2">

          <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Thought Bytes
          </h1>

          <h2 className="text-xl text-gray-500 ">
            Get the newsletter in your inbox every Thursday
          </h2>
        </div>

        <SubscribeForm />
      </div>

    </Section>
  );
}
