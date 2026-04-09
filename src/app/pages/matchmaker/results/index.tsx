import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import destinations from "@/data/destinations.json" with { type: "json" };
import criteria from "@/data/criteria.json" with { type: "json" };
import answersToCriterion from "@/data/answers_to_criterion.json" with { type: "json" };

import type { Destination } from "@/types/destination";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useMatchmaker } from "@/contexts/matchmaker";
import { rankDestinations } from "@/utils/matchmaker";
import { useComparison } from "@/contexts/comparison";

export function Results() {
  const { selectedAnswers } = useMatchmaker();

  const results = React.useMemo(() => {
    return rankDestinations(destinations as any, selectedAnswers);
  }, [selectedAnswers]);

  const selectedCriteriaSlugs = React.useMemo(() => {
    return Object.values(selectedAnswers).flatMap(
      (answerSlug) =>
        (answersToCriterion as Record<string, string[]>)[answerSlug] || [],
    );
  }, [selectedAnswers]);

  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row">
        {/* Left Side: Hero (Sticky on desktop) */}
        <aside className="lg:sticky lg:top-16 lg:h-[calc(100svh-64px)] lg:w-1/3 lg:min-w-80">
          <Hero />
        </aside>

        <main className="flex-1 px-4 py-12 lg:px-12 lg:py-24">
          <section className="animate-in fade-in slide-in-from-bottom-8 mb-20 duration-1000">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-2">
              {results.slice(0, 16).map((result) => {
                const { destination, score, matchedCriteria } = result;

                const matchedPros = criteria
                  .filter((c) => matchedCriteria.includes(c.slug))
                  .map((c) => c.pro);

                const unmatchedCons = criteria
                  .filter(
                    (c) =>
                      selectedCriteriaSlugs.includes(c.slug) &&
                      !matchedCriteria.includes(c.slug),
                  )
                  .map((c) => c.con);

                return (
                  <li key={destination.id}>
                    <CardX
                      destination={destination}
                      score={score}
                      pros={matchedPros}
                      cons={unmatchedCons}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="mt-8 flex flex-col items-start justify-center p-6 lg:mt-0 lg:h-full lg:p-6 lg:text-left">
      <header className="w-full">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          Your Perfect <span className="text-primary">Matches</span>
        </h1>

        <p className="mb-4 text-base leading-relaxed font-medium text-neutral-500 md:text-lg lg:mb-6">
          We've analyzed your lifestyle preferences to find the best
          destinations for your next chapter.{" "}
          <span className="lg:inline">
            Discover places that align with your budget, climate, and community
            needs.
          </span>
        </p>

        <div className="flex flex-row flex-wrap items-start justify-start gap-1 sm:flex-row">
          <Wouter.Link href="/matchmaker">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-900 bg-primary px-6 py-3 text-sm font-bold whitespace-nowrap text-white">
              Retake Quiz
            </div>
          </Wouter.Link>

          <Wouter.Link href="/explore">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-500">
              Explore
            </div>
          </Wouter.Link>
        </div>
      </header>
    </section>
  );
}

export function CardX({
  destination,
  score,
  cons,
}: {
  destination: Destination;
  score: number;
  pros: readonly string[];
  cons: readonly string[];
}) {
  const { toggleDestination, isDestinationSelected } = useComparison();
  const isSelected = isDestinationSelected(destination.id);

  return (
    <article
      className={`relative overflow-hidden rounded-4xl border p-2 outline-2 transition-all hover:shadow-md ${
        isSelected
          ? "border-accent outline-accent"
          : "border-neutral-200 bg-white outline-transparent"
      }`}
    >
      <div className="relative h-64 overflow-hidden rounded-3xl">
        <img
          loading="lazy"
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className={`absolute top-0 right-0 size-full object-cover object-center`}
          alt={`scenic image of ${destination.name}`}
        />

        {/* Match Score Badge */}
        <div className="absolute top-2 right-2 flex w-full items-center justify-end gap-0.5">
          <div className="rounded-full border border-white/20 bg-black/20 p-3 backdrop-blur-md">
            <span className="block text-xs leading-none font-bold text-white">
              {score}% match
            </span>
          </div>
        </div>
      </div>

      <header className="px-2 py-4">
        <div className="flex flex-row flex-wrap items-center justify-start gap-1 gap-y-0.5">
          <div className="flex flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full bg-neutral-100 px-3 py-1 whitespace-nowrap">
            <Lucide.MapPinned className="size-3.5 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-500">
              {destination.region}
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full bg-neutral-100 px-3 py-1 whitespace-nowrap">
            <Lucide.Snowflake className="size-3.5 text-neutral-500" />
            <span className="text-xs font-medium text-neutral-500">
              {destination.climate}
            </span>
          </div>
        </div>

        <h1 className="mt-4 mb-2 text-2xl leading-none font-bold text-neutral-600">
          {destination.name}
        </h1>

        <p className="line-clamp-3 text-sm leading-relaxed font-medium text-neutral-500">
          {destination.description}
        </p>
      </header>

      <div className="mx-2 mb-4 rounded-2xl border-0 border-primary bg-primary/5">
        <ul className="scrollbar-none flex h-40 flex-col gap-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-primary uppercase">
              Important caveats
            </span>
            <Lucide.CircleAlert className="size-4 stroke-primary" />
          </div>
          <div />
          {/* {pros.map((pro, i) => ( */}
          {/*   <li key={`pro-${i}`} className="flex items-center gap-2"> */}
          {/*     <Lucide.Check */}
          {/*       className="size-3.5 shrink-0 text-green-500" */}
          {/*       strokeWidth={3} */}
          {/*     /> */}
          {/*     <span className="text-sm font-medium text-neutral-600 first-letter:uppercase"> */}
          {/*       {pro} */}
          {/*     </span> */}
          {/*   </li> */}
          {/* ))} */}
          {cons.map((con, i) => (
            <li key={`con-${i}`} className="flex items-center gap-2">
              <Lucide.CircleSmall className="size-3 shrink-0 stroke-primary" />
              <span className="text-sm font-medium text-neutral-500 first-letter:uppercase">
                {con}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-1 p-2">
        <Wouter.Link href={`/${destination.id}/overview`}>
          <div className="flex items-center justify-center rounded-full bg-primary p-3 text-sm font-semibold whitespace-nowrap text-white transition-all hover:bg-primary hover:shadow-lg active:scale-95">
            View Details
          </div>
        </Wouter.Link>

        <button
          onClick={() => toggleDestination(destination)}
          className={`flex items-center justify-center rounded-full border p-3 text-sm font-semibold whitespace-nowrap transition-all hover:shadow-lg active:scale-95 ${
            isSelected
              ? "border-accent bg-accent text-white"
              : "border-neutral-200 bg-white text-neutral-500 hover:bg-accent"
          }`}
        >
          {isSelected ? "Selected" : "Compare"}
        </button>
      </div>
    </article>
  );
}
