import Markdown from 'components/Markdown';

type PostProps = {
  title: string,
  source: string,
}

export default function Post({ title, source }: PostProps) {
  return (
    <div className="prose mx-auto py-8">

      <h1>{title}</h1>

      <Markdown source={source} />

    </div>
  );
}
