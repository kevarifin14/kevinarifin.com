import PostCard from 'components/PostCard';
import Section from 'components/Section';

export default function RelatedSection({ className, posts }) {
  const relatedSectionClassName = [
    'py-12', 'space-y-6',
    className,
  ].join(' ');

  return (
    <Section className={relatedSectionClassName}>
      <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
        Keep Reading
      </h1>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-8">
        {posts
          .map((post) => <PostCard post={post} contentType="blog" />)}
      </div>
    </Section>
  );
}
