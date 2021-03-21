import moment from 'moment';
import Link from 'next/link';

export default function PostPreview({
  title, excerpt, slug, date, contentType,
}) {
  return (
    <Link href={`/${contentType}/[slug]`} as={`/${contentType}/${slug}`}>
      <div className="cursor-pointer my-8">

        <div className="mb-2">
          <h1>{title}</h1>
          <h3>{date && moment(date).format('LL')}</h3>
        </div>

        <p>{excerpt}</p>

      </div>
    </Link>
  );
}
