import { useRouter } from "next/router";
import Typewriter, { Options } from "typewriter-effect";

import { MagicButton } from "components/MagicButton";

import { POST_TAGS } from "lib/constants";

export function IndexPage() {
  const router = useRouter();

  const typewriterOptions: Options = {
    wrapperClassName:
      "bg-gradient-to-tr from-primary-400 to-primary-600 bg-clip-text text-transparent font-extrabold",
    cursorClassName: "Typewriter__cursor",
    loop: true,
  };

  const title = "Hi, I'm Kevin.";
  const subtitle = "I write about";

  const buttonClassNames = [
    "-rotate-1 transform sm:-rotate-3",
    "rotate-1 transform sm:translate-y-4",
    "sm:-tranlate-y-2 rotate-1 transform sm:rotate-3",
  ];

  return (
    <div className="mx-auto max-w-5xl px-8 sm:px-6 lg:px-4">
      <section className="prose space-y-4 py-16 text-xl sm:text-2xl dark:prose-invert md:text-3xl lg:text-4xl">
        <h1 className="my-0">{title}</h1>

        <h1 className="flex flex-col sm:flex-row">
          <span className="mr-4">{subtitle}</span>
          <Typewriter
            options={typewriterOptions}
            onInit={(typewriter) => {
              typewriter
                .typeString("web3.")
                .pauseFor(1000)
                .deleteAll()
                .pauseFor(1000)
                .typeString("startups.")
                .pauseFor(1000)
                .deleteAll()
                .typeString("buidling.")
                .pauseFor(1000)
                .start();
            }}
          />
        </h1>
      </section>

      <div className="grid gap-8 sm:grid-cols-3">
        {POST_TAGS.map((postTag, i) => (
          <MagicButton
            size="lg"
            key={postTag.name}
            onClick={() => router.push(`/${postTag.name.toLowerCase()}`)}
            className={buttonClassNames[i]}
            color={postTag.color}
          >
            <div className="flex-col items-start space-y-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl">
                {postTag.emoji}
              </div>

              <h1 className="text-left font-extrabold text-4xl">
                {postTag.name}
              </h1>
            </div>
          </MagicButton>
        ))}
      </div>
    </div>
  );
}
