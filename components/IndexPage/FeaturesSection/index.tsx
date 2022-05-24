import _ from "lodash";

import { Card } from "components/Card";
import { Header, HeaderProps } from "components/Header";

import { classNames, downsize, TailwindSize } from "lib/tailwind";

type FeaturesSectionProps = {
  title: string;
  description: string;
  features: HeaderProps[];
  className?: string;
  size?: TailwindSize;
};

export function FeaturesSection({
  title,
  description,
  features,
  className,
  size = "3xl",
}: FeaturesSectionProps) {
  const featuresSectionClassName = classNames("space-y-8", className);

  return (
    <section className={featuresSectionClassName}>
      <Header centered size={size} title={title} description={description} />
      <div className="grid sm:grid-cols-3 sm:gap-4">
        {features.map((feature) => (
          <Card key={feature.title} size={size}>
            <Header {...feature} size={downsize(size)} />
          </Card>
        ))}
      </div>
    </section>
  );
}
