import Markdown from './Markdown';

type BookPostProps = {
  slug: string,
  content: string,
}

export default function BookPost({ slug, content }: BookPostProps) {
  return (
    <div className="max-w-screen-lg mx-auto py-8">

      <div className="grid grid-cols-auto-1fr gap-8">

        <div className="h-screen sticky hidden sm:block" style={{ top: '10px' }}>
          <img
            src={`/books/${slug}-cover.jpg`}
            className="w-64 shadow-xl"
            alt={slug}
          />
        </div>

        <Markdown source={content} />
      </div>

    </div>
  );
}
