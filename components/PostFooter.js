import Subscribe from 'components/Subscribe';

export default function PostFooter() {
  return (
    <div
      style={{
        width: '100%',
        marginTop: '1em',
        padding: '2em 0.5em',
        paddingBottom: '3em',
        borderTop: '1px solid #eaeaea',
      }}
    >
      <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <h2>Aspiring to build your own startups?</h2>
        <p>
          Subscribe to Thought Bytes to get lessons from my journey as Edith&apos;s
          technical co-founder delivered straight to your inbox every Thursday.
        </p>
      </div>

      <Subscribe />
    </div>
  );
}
