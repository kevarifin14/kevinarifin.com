import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { GITHUB_URL, LINKEDIN_URL, X_URL } from '@/lib/constants'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Kevin Arifin, a software developer and entrepreneur based in San Francisco. I'm the technical co-founder at Underdog Protocol, where we simplify blockchain development with tools that empower developers to build on the blockchain effortlessly.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Kevin Arifin.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              About Me
            </h2>
            <p>
              At Underdog Protocol, I focus on transforming complex blockchain
              technology into user-friendly tools that developers can rely upon.
              Since 2017, I've been driven by a passion to demystify the crypto
              space and create solutions that genuinely enhance the developer
              experience. What excites me most about blockchain is its potential
              to separate data from the services that use it, leading to more
              competition and, ultimately, a better user experience. That's why
              I'm committed to web3—it ensures that your data is not confined to
              a single platform, allowing for greater innovation and improved
              services.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              My Routine
            </h2>
            <p>
              When I’m not working, you’ll find me working out. I’ve closed my
              Apple Watch rings for over 1800 days straight, burning an average
              of 1300 calories daily. This routine is a reflection of my belief
              that consistency shapes who we are.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              Basketball as Meditation
            </h2>
            <p>
              Basketball, for me, is more than just exercise; it’s a form of
              meditation where I practice the "next-shot" mentality. Whether I’m
              shooting alone or playing pick-up games, I focus on keeping a
              steady head, whether I’m on a hot streak or in a slump, embracing
              the idea that what matters is the next move.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              Pushing Limits
            </h2>
            <p>
              I also push my limits through max sets in calisthenics and by
              cycling over 200 miles each month through the streets of San
              Francisco. These consistent habits, from the court to the city
              streets, shape my approach to both life and work.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href={X_URL} icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href={GITHUB_URL} icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href={LINKEDIN_URL}
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:kevarifin14@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              kevarifin14@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
