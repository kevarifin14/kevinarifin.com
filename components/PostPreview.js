import Link from 'next/link';

import { formatDateString } from 'utils';

export default function PostPreview({
  title, excerpt, slug, date, type, hideHr,
}) {
  return (
    <Link href={`/${type}/[slug]`} as={`/${type}/${slug}`}>
      <div style={{ cursor: 'pointer' }}>
        <h2>
          {`${title} - ${formatDateString(date)}`}
        </h2>

        <p>{excerpt}</p>

        {!hideHr && <hr />}

      </div>
    </Link>
  );
}
