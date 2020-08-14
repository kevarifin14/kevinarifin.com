import Subscribe from 'components/Subscribe';

export default function PostFooter({ className }) {
  return (
    <div className="my-4 p-8 border-t border-gray-200 border-solid">
      <div className={[
        'mx-auto text-center',
        className,
      ].join(' ')}
      >
        <h2>Aspiring to build your own startup?</h2>
        <p className="mb-4">
          Subscribe to Thought Bytes to get lessons from my journey as Edith&apos;s
          technical co-founder delivered straight to your inbox every Thursday.
        </p>
        <Subscribe className="max-w-sm" />
      </div>

    </div>
  );
}
