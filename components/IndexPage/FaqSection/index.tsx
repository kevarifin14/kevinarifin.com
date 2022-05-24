import { Disclosure } from "components/Disclosure";
import { Header } from "components/Header";

type FaqSectionProps = {
  title: string;
  description?: string;
  qaps: {
    title: string;
    description: string;
  }[];
};

export function FaqSection({ qaps, title, description }: FaqSectionProps) {
  return (
    <section className="max-w-prose mx-auto">
      <Header
        className="pb-8"
        size="4xl"
        centered
        title={title}
        description={description}
      />
      <div className="space-y-4">
        {qaps.map((props) => (
          <Disclosure {...props} key={props.title} />
        ))}
      </div>
    </section>
  );
}
