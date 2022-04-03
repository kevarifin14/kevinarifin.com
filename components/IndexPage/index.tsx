import { useRouter } from "next/router";
import Typewriter, { Options } from "typewriter-effect";

import { PostTagCard } from "components/PostTagCard";

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

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="prose space-y-4 py-16 text-2xl dark:prose-invert md:text-3xl lg:text-4xl">
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
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        <button
          onClick={() => router.push(`/${POST_TAGS[0].name.toLowerCase()}`)}
          className="-rotate-1 transform sm:-rotate-3"
        >
          <PostTagCard postTag={POST_TAGS[0]} />
        </button>

        <button
          onClick={() => router.push(`/${POST_TAGS[1].name.toLowerCase()}`)}
          className="rotate-1 transform sm:translate-y-4"
        >
          <PostTagCard postTag={POST_TAGS[1]} />
        </button>

        <button
          onClick={() => router.push(`/${POST_TAGS[2].name.toLowerCase()}`)}
          className="sm:-tranlate-y-2 rotate-1 transform sm:rotate-3"
        >
          <PostTagCard postTag={POST_TAGS[2]} />
        </button>
      </div>
    </div>
  );
}
