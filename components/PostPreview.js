import Link from 'next/link';

import { formatDateString } from 'utils';

export default function PostPreview({
  title, excerpt, slug, date, type, hideHr,
}) {
  return (
    <>
      <Link href={`/${type}/[slug]`} as={`/${type}/${slug}`}>
        <div className="cursor-pointer my-4">
          <h2>{title}</h2>
          <h4 className="mb-2">{formatDateString(date)}</h4>

          <p>{excerpt}</p>
        </div>
      </Link>
      {!hideHr && <hr />}
    </>
  );
}
