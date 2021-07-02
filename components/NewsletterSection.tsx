import { classNames } from 'utils/tailwind';

import Markdown from './Markdown';
import Section from './Section';
import SubscribeForm from './SubscribeForm';

type NewsletterSectionProps = {
  content: string,
  className?: string
}

export default function NewsletterSection({ className, content }: NewsletterSectionProps) {
  return (
    <Section className={classNames('py-16', className)} color="bg-gray-100">

      <div className="grid lg:grid-cols-2 lg:gap-16">
        <div className="space-y-2 pb-4">
          <Markdown>{content}</Markdown>
        </div>

        <div className="mx-auto space-y-8">
          <div className="bg-white p-16 space-y-8">
            <h4 className="text-center">Get Personal Growth Hacks in your inbox</h4>
            <SubscribeForm />
          </div>
        </div>
      </div>

    </Section>
  );
}
