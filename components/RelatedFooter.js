import PostPreview from './PostPreview';

export default function RelatedFooter({ related, className }) {
  return (
    related.length > 0
      && (
      <div className="w-full mt-4 pt-8 px-2 pb-12 border-solid border-t border-gray-300">
        <div className={['mx-auto', className].join(' ')}>
          <h1>Related</h1>

          {related.map(({
            title, date, excerpt, slug, contentType,
          }, i) => (
            <PostPreview
              title={title}
              type={contentType == 'newsletters' ? 'tb' : contentType}
              date={date}
              excerpt={excerpt}
              slug={slug}
              hideHr={i == related.length - 1}
            />
          ))}
        </div>
      </div>
      )
  );
}
