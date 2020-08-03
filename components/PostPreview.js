import Link from 'next/link';

import { formatDateString } from 'utils';

export default function PostPreview({
  title, excerpt, slug, date, type, hideHr,
}) {
  return (
    <Link href={`/${type}/[slug]`} as={`/${type}/${slug}`}>
      <div style={{ cursor: 'pointer' }}>
        <h2 style={{ marginBlockEnd: '0.25em' }}>{title}</h2>
        <h4 style={{ marginBlockStart: 0 }}>{formatDateString(date)}</h4>

        <p>{excerpt}</p>

        {!hideHr && <hr />}

      </div>
    </Link>
  );
}
