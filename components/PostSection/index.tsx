import moment from 'moment';
import Link from 'next/link';

import Markdown from 'components/Markdown';
import Section from 'components/Section';

type PostSectionProps = {
  title: string,
  date: string,
  content: string,
}

export default function PostSection({ title, date, content }: PostSectionProps) {
  return (
    <Section className="grid lg:grid-cols-auto-1fr gap-16 pb-16 pt-8">

      <Markdown title={title} date={date}>{content}</Markdown>

      <div className="flex flex-col justify-between lg:px-8">

        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-primary text-xs uppercase font-bold">About the author</p>
            <p>
              <strong>Kevin Arifin</strong>
              {' '}
              writes about personal growth as a startup founder.
              He is currently the technical co-founder of Edith, a startup building the future of
              mentorship.
            </p>

          </div>

          <div>
            <Link href="/about"><a>Click here to learn more &rarr;</a></Link>
          </div>

        </div>

      </div>

    </Section>
  );
}
