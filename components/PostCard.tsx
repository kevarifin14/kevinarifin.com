import moment from 'moment';
import Link from 'next/link';

import { IPost } from 'utils/content-manager';

type PostCardProps = {
  post: IPost,
  contentType: string,
}

export default function PostCard({ post, contentType }: PostCardProps) {
  const {
    title, excerpt, date, slug,
  } = post;

  const href = `/${contentType}/${slug}`;

  return (
    <div className="cursor-pointer">
      <Link href={href}>
        <a className="mt-2 block no-underline">
          <p className="text-xl font-semibold text-gray-900">
            {title}
          </p>

          <p className="text-sm text-gray-500">
            <time>{moment(date).format('MMMM D, YYYY')}</time>
          </p>

          <p className="mt-3 text-base text-gray-500">
            {excerpt}
          </p>
        </a>
      </Link>

      <div className="mt-3">
        <Link href={href}>
          <a className="text-base font-semibold no-underline text-secondary hover:text-secondary-light">
            Read full story
          </a>
        </Link>
      </div>

    </div>
  );
}
