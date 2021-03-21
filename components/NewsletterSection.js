import Section from './Section';
import SubscribeForm from './SubscribeForm';

export default function NewsletterSection({ className }) {
  const newsletterSectionClassName = [
    'py-12', 'space-y-6',
    className,
  ].join(' ');
  return (
    <Section className={newsletterSectionClassName}>

      <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        Thought Bytes
      </h1>

      <div className="lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-xl text-gray-500 ">
            Get the newsletter in your inbox every Thursday
          </h2>
        </div>

        <div className="mt-8 lg:mt-0 lg:ml-8">
          <SubscribeForm />
        </div>
      </div>

    </Section>
  );
}
