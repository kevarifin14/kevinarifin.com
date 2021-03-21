import _ from 'lodash';
import Link from 'next/link';

import styles from 'styles/BookSpotlight.module.scss';

export default function BookSpotlight({
  title, author, slug, recap, notes, className,
}) {
  return (
    <div
      className={[
        'grid grid-cols-3 w-full shadow-lg',
        className,
      ].join(' ')}
    >
      <div
        className="col-span-1"
        style={{
          backgroundImage: `url(${slug ? `/books/${slug}-cover.jpg` : `/books/${_.kebabCase(title)}-cover.jpg`})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
        }}
      />
      <div className={styles.stuff}>

        <div>
          <h3>{title}</h3>
          <p>{author}</p>
        </div>

        <div className="flex flex-row mt-4">

          {notes
          && (
          <>
            <a href={notes} target="_blank" rel="noreferrer">
              Notes
            </a>
          </>
          )}

          {notes && recap && ' | '}

          {recap
            && (
            <Link href="/blog/[slug]" as={slug ? `/blog/${slug}` : `/blog/${_.kebabCase(title)}`}>
              Recap
            </Link>
            )}

        </div>
      </div>
    </div>
  );
}
