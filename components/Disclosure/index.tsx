import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { HiChevronUp } from "react-icons/hi";

// import { analytics, trackFaqQuestion } from "lib/analytics";
import { classNames } from "lib/tailwind";

type DisclosureProps = {
  title: string;
  description: string;
};

export function Disclosure({ title, description }: DisclosureProps) {
  return (
    <HeadlessDisclosure>
      {({ open }) => (
        <div>
          <HeadlessDisclosure.Button
            // onClick={() => trackFaqQuestion(title)}
            className={classNames(
              "p-3 w-full rounded-lg-t rounded-lg-br text-left",
              open
                ? "bg-secondary-light rounded-t-lg border-t border-x border-secondary-dark"
                : "bg-light-light dark:bg-dark-light border border-light-accent dark:border-dark-accent rounded-md"
            )}
          >
            <div
              className={classNames(
                "prose flex items-center justify-between w-full",
                open ? "" : "dark:prose-invert"
              )}
            >
              <h3 className="my-0">{title}</h3>
              <div className="not-prose">
                <HiChevronUp
                  className={classNames(
                    "h-8 w-8 transform dark:bg-dark-accent/50 bg-light-dark/50 rounded-full p-1",
                    open
                      ? "rotate-180 bg-light-dark/0 dark:bg-dark-accent/0"
                      : "rotate-0"
                  )}
                />
              </div>
            </div>
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel
            className={classNames(
              "prose bg-secondary-light rounded-b-md border-b border-secondary-dark border-x px-3 pb-3",
              open ? "" : "dark:prose-invert"
            )}
          >
            <p>{description}</p>
          </HeadlessDisclosure.Panel>
        </div>
      )}
    </HeadlessDisclosure>
  );
}
