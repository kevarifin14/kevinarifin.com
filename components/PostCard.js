import moment from 'moment';
import Link from 'next/link';

export default function Post({ post, contentType }) {
  const {
    title, excerpt, date, slug,
  } = post;

  const href = `/${contentType}/${slug}`;

  return (
    <div className="cursor-pointer">
      {/* <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium
      bg-green-100 text-green-800`}>
        {_.startCase(type)}
      </span> */}

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
