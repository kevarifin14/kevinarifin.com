import Link from 'next/link';

import Markdown from 'components/Markdown';
import Section from 'components/Section';

type PostSectionProps = {
  title: string,
  content: string,
}

export default function PostSection({ title, content }: PostSectionProps) {
  return (
    <Section className="grid lg:grid-cols-auto-1fr gap-16 pb-16 pt-8">

      <div>
        <div className="prose pb-8">
          <h1>{title}</h1>
        </div>

        <Markdown source={content} />
      </div>

      <div className="flex flex-col justify-between px-16">

        <div className="space-y-4">
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
