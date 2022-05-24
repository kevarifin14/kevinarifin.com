import { Button } from "components/Button";
import { Container } from "components/Container";

import { FaqSection } from "./FaqSection";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { SubscribeForm } from "./SubscribeForm";

export function IndexPage() {
  const content = {
    hero: {
      title:
        "Love to *buidl*, but tired of building *everything from scratch*?",
      description:
        "Buidling Blocks make spinning out a fully customizable marketing site, application, or anything you want faster. So you can focus on what makes you *different*.",
    },
    problem: {
      title: "Buidling is about taking your product to market, *faster*.",
      description:
        "But every time you want to build anything, you have to rebuild everything.\n\nDatabase, authentication, design system, production deployment. The list doesn't end.\n\n",
    },
    solution: {
      title: "Buidling Blocks is the bridge between *code* and *no-code*.",
      description:
        "Components come, fully customizable with the power of Tailwind CSS.",
    },
    features: {
      title: "Everything you need to go from idea to *MVP*",
      description: "",
      features: [
        {
          title: "Design System",
          description:
            "Components in your codebase, not as a package, *fully customizable* with the power of Tailwind CSS.",
        },
        {
          title: "Database",
          description: "Develop and buidl",
        },
        {
          title: "Web3",
          description:
            "Buidl the future with support for wallets out-of-the-box",
        },
      ],
    },
    cta: {
      title: "Want to get early access to Buidling Blocks?",
      description: "Drop your email to get Book of Buidl",
    },
    faq: {
      title: "Still have a *question*?",
      qaps: [
        {
          title: "How much does this cost?",
          description: "It's free!",
        },
      ],
    },
  };

  return (
    <div className="relative flex-1 w-full max-w-7xl justify-center mx-auto">
      <Container size="3xl" className="py-16">
        <HeroSection {...content.hero} size="3xl" className="space-y-8">
          <SubscribeForm
            size="xl"
            className="max-w-xl mx-auto"
            cta="Get Early Access"
          />
        </HeroSection>
      </Container>

      <Container size="5xl" className="py-16">
        <HeroSection {...content.problem} inline size="2xl"></HeroSection>
      </Container>

      <Container size="5xl" className="py-16">
        <HeroSection {...content.solution} inline reverse size="2xl">
          <div></div>
        </HeroSection>
      </Container>

      <Container size="5xl" className="py-16">
        <FeaturesSection {...content.features} size="3xl" />
      </Container>

      <Container size="5xl" className="py-16">
        <HeroSection
          {...content.cta}
          size="3xl"
          className="space-y-8 bg-light-dark dark:bg-dark-light py-16 rounded-md"
        >
          <SubscribeForm
            size="lg"
            className="max-w-xl mx-auto"
            cta="Get the Book of Buidl"
          />
        </HeroSection>
      </Container>

      <Container className="py-16">
        <FaqSection {...content.faq} />
      </Container>
    </div>
  );
}
