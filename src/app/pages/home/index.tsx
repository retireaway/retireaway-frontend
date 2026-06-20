import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import { Page } from "@/components/page";

export function Home() {
  return (
    <Page>
      <div className="h-16" />

      <header className="">
        <h1 className="text-center text-5xl font-bold tracking-tight text-neutral-800">
          Your Perfect Retirement
        </h1>
      </header>

      <div className="h-10" />

      <ul className="mx-auto flex flex-row gap-6">
        <li>
          <Wouter.Link href="/explore">
            <QuickLink icon={Lucide.Earth} text="Countries" />
          </Wouter.Link>
        </li>

        <li>
          <Wouter.Link href="/specialist/sjp">
            <QuickLink icon={Lucide.Building2} text="Specialists" />
          </Wouter.Link>
        </li>

        <li>
          <QuickLink icon={Lucide.BookOpenText} text="Resources" />
        </li>
      </ul>

      <div className="h-4" />

      <Searchbar />

      <div className="h-16" />

      <MatchmakerCard1 />

      <div className="h-8" />
    </Page>
  );
}

function QuickLink({
  icon: Icon,
  text,
}: {
  icon: Lucide.LucideIcon;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1 p-2">
      <Icon className="size-6 stroke-neutral-800" />
      <span className="text-lg leading-none font-semibold tracking-tight text-neutral-800">
        {text}
      </span>
    </div>
  );
}

function Searchbar() {
  return (
    <div className="mx-auto flex h-15 w-190 items-center rounded-s-full rounded-e-full border border-neutral-500 p-1 shadow-md">
      <div className="pr-2 pl-4">
        <Lucide.Search className="size-6 stroke-neutral-800" />
      </div>

      <input
        className="w-0 grow text-base text-neutral-800 focus:outline-none"
        placeholder="Search countries, visa guides, specialists, or cost of living..."
      />

      <button
        type="button"
        className="_bg-[#FFB700] h-full rounded-s-full rounded-e-full border border-neutral-500 bg-primary/10 px-8"
      >
        <span className="font-semibold tracking-tight text-neutral-900">
          Search
        </span>
      </button>
    </div>
  );
}

function MatchmakerCard1() {
  return (
    <article className="grid h-112 w-284 grid-cols-[55fr_min-content_45fr] gap-8 rounded-lg bg-primary/10 p-6">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={`/images/destinations/vietnam/vietnam.webp`}
          className="absolute top-0 left-0 size-full object-cover object-center"
        />

        <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/0 from-80% to-black" />

        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-3xl font-bold tracking-tight text-white">
            Vietnam
          </p>
        </div>
      </div>

      <div className="w-px bg-neutral-400"></div>

      <div className="flex flex-col justify-center">
        <header>
          <h2 className="text-center text-5xl leading-none font-bold tracking-tight text-neutral-800">
            Find the perfect country for your dream retirement
          </h2>
        </header>

        <div className="h-4" />

        <p className="text-center text-lg leading-tight font-normal">
          Get a personalized score for top destinations.
        </p>

        <div className="h-6" />

        <Wouter.Link href="/matchmaker">
          <div className="mx-auto flex w-min flex-row items-center justify-center gap-1.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-4 py-2 outline outline-primary">
            <Lucide.Play className="size-5 fill-accent stroke-neutral-800" />
            <span className="text-base font-semibold whitespace-nowrap text-neutral-900">
              Take quiz
            </span>
          </div>
        </Wouter.Link>
      </div>
    </article>
  );
}
