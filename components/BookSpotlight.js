import Link from 'next/link';

import _ from 'lodash';
import useSal from 'hooks/useSal';
import styles from 'styles/BookSpotlight.module.scss';
import { slideUp } from 'utils/sal-props';

export default function BookSpotlight({
  title, author, slug, readingNotes, className,
}) {
  useSal();

  return (
    <div
      className={[
        'grid grid-cols-3 w-full shadow-2xl',
        className,
      ].join(' ')}
      {...slideUp}
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
          <h2>{title}</h2>
          <h4>{author}</h4>
        </div>

        {readingNotes && <Link href="/blog/[slug]" as={slug ? `/blog/${slug}` : `/blog/${_.kebabCase(title)}`}>Reading Notes</Link>}
      </div>
    </div>
  );
}
