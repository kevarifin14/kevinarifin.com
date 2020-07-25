import PostPreview from './PostPreview';

export default function RelatedFooter({ related, maxWidth }) {
  return (
    related.length > 0
      && (
      <div
        style={{
          width: '100%',
          marginTop: '1em',
          padding: '2em 0.5em',
          paddingBottom: '3em',
          borderTop: '1px solid #eaeaea',
        }}
      >
        <div style={{ maxWidth, margin: 'auto' }}>
          <h1>Related</h1>

          {related.map(({
            title, date, excerpt, slug,
          }, i) => (
            <PostPreview
              title={title}
              type="tb"
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
