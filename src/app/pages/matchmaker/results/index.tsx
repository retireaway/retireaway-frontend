import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import destinations from "@/data/destinations.json" with { type: "json" };
import criteria from "@/data/criteria.json" with { type: "json" };
import answersToCriterion from "@/data/answers_to_criterion.json" with { type: "json" };

import * as Icons from "@/assets/icons";

import type { Destination } from "@/types/destination";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useMatchmaker } from "@/contexts/matchmaker";
import { rankDestinations } from "@/utils/matchmaker";
import { useComparison } from "@/contexts/comparison";
import { climateToIcon } from "@/utils/mappings";

export function Results() {
  const { selectedAnswers } = useMatchmaker();

  const results = React.useMemo(() => {
    return rankDestinations(destinations as any, selectedAnswers);
  }, [selectedAnswers]);

  const selectedCriteriaSlugs = React.useMemo(() => {
    return Object.values(selectedAnswers)
      .flat()
      .flatMap(
        (answerSlug) =>
          (
            answersToCriterion as Record<
              string,
              { criteria: string[]; weight: number }
            >
          )[answerSlug] || [],
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
                      selectedCriteriaSlugs.some((_) =>
                        _.criteria.includes(c.slug),
                      ) && !matchedCriteria.includes(c.slug),
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
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
          Your
          <br /> <span className="text-primary">Matches</span>
        </h1>

        <p className="mb-4 text-base leading-relaxed font-medium text-neutral-500 md:text-lg lg:mb-6">
          We've analyzed your lifestyle preferences to find the best
          destinations for your next chapter. Discover places that align with
          your budget, climate, and community needs.
        </p>

        <div className="flex flex-row flex-wrap items-start justify-start gap-1 sm:flex-row">
          <Wouter.Link href="/matchmaker">
            <div className="flex items-center justify-center gap-1 rounded-full border border-transparent bg-primary px-4 py-2 text-xs font-bold whitespace-nowrap text-white">
              Retake Quiz
            </div>
          </Wouter.Link>

          <Wouter.Link href="/explore">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-bold text-neutral-500">
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
  cons,
  score,
}: {
  destination: Destination;
  score: number;
  pros: readonly string[];
  cons: readonly string[];
}) {
  const { toggleDestination, isDestinationSelected } = useComparison();
  const isSelected = isDestinationSelected(destination.id);

  const [isSaved, setIsSaved] = React.useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("saved_destinations") || "[]",
      );
      return Array.isArray(saved) && saved.includes(destination.id);
    } catch {
      return false;
    }
  });

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const savedRaw = localStorage.getItem("saved_destinations");
      const saved = JSON.parse(savedRaw || "[]");
      const nextSaved = isSaved
        ? saved.filter((id: string) => id !== destination.id)
        : [...(Array.isArray(saved) ? saved : []), destination.id];

      localStorage.setItem("saved_destinations", JSON.stringify(nextSaved));
      setIsSaved(!isSaved);
    } catch (err) {
      console.error("Failed to save destination", err);
    }
  };

  const ClimateIcon = climateToIcon(destination.climate);

  return (
    <article
      className={`relative overflow-hidden rounded-xl border p-2 outline-2 transition-all hover:shadow-md ${
        isSelected
          ? "border-accent outline-accent"
          : "border-neutral-200 bg-white outline-transparent"
      }`}
    >
      <div className="relative h-64 overflow-hidden rounded-xl">
        <img
          loading="lazy"
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className={`absolute top-0 right-0 size-full object-cover object-center`}
          alt={`scenic image of ${destination.name}`}
        />
        <div className="absolute bottom-2 left-2 flex flex-row items-center justify-center gap-0.5">
          <div className="flex flex-row items-center gap-1 rounded-s-full rounded-e-full border border-neutral-400 bg-white px-3 py-2 transition-all hover:bg-neutral-50 active:scale-95">
            <span className="text-xs leading-none font-bold text-neutral-700">
              {score}% match
            </span>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-row items-center justify-center gap-0.5">
          {isSelected ? (
            <button
              onClick={() => toggleDestination(destination)}
              className="flex flex-row items-center gap-1 rounded-s-full rounded-e-full border border-accent bg-accent px-3 py-2 transition-all active:scale-95"
            >
              <Lucide.Check className="size-3.5 stroke-white" />
              <span className="text-xs leading-none font-bold text-white">
                Compare
              </span>
            </button>
          ) : (
            <button
              onClick={() => toggleDestination(destination)}
              className="flex flex-row items-center gap-1 rounded-s-full rounded-e-full border border-neutral-400 bg-white px-3 py-2 transition-all hover:bg-neutral-50 active:scale-95"
            >
              <Icons.Compare className="size-3.5 fill-neutral-700 stroke-neutral-700" />
              <span className="text-xs leading-none font-bold text-neutral-700">
                Compare
              </span>
            </button>
          )}

          <button
            onClick={toggleSave}
            className="flex size-8 items-center justify-center rounded-full border border-neutral-400 bg-white transition-all hover:bg-neutral-50 active:scale-95"
            aria-label={isSaved ? "Remove from saved" : "Save destination"}
          >
            <Lucide.Heart
              className={`size-5 transition-colors ${
                isSaved
                  ? "fill-red-500 stroke-neutral-700"
                  : "fill-none stroke-neutral-700"
              }`}
            />
          </button>
        </div>
      </div>

      <header className="px-2 py-4">
        <div className="mb-1 flex flex-row items-center justify-between gap-2">
          <h2 className="text-2xl leading-none font-bold text-neutral-800">
            {destination.name}
          </h2>
        </div>

        <div className="mb-2 flex flex-row flex-wrap items-center justify-start gap-2">
          <div className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border-0 border-neutral-200 whitespace-nowrap">
            <Lucide.Globe className="size-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-800">
              {destination.region}
            </span>
          </div>

          <Lucide.CircleSmall className="size-2 text-neutral-700" />

          <div className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border-0 border-neutral-200 whitespace-nowrap">
            <ClimateIcon className="size-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-700">
              {destination.climate}
            </span>
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed font-normal text-neutral-600">
          {destination.description}
        </p>

        {/* <div className="group/calculator relative mb-4 flex flex-col gap-3 rounded-xl border border-neutral-200 p-3 transition-all hover:border-primary/30 hover:bg-primary/5"> */}
        {/*   <Wouter.Link */}
        {/*     href={`/${destination.id}/calculator`} */}
        {/*     className="absolute inset-0 z-10" */}
        {/*   /> */}
        {/*   <div className="flex flex-row items-center justify-between gap-4"> */}
        {/*     <div className="flex flex-col gap-0.5"> */}
        {/*       <div className="flex items-center gap-1 text-neutral-400"> */}
        {/*         <Lucide.UserRound className="size-3.5" /> */}
        {/*         <span className="text-[10px] font-bold tracking-wider uppercase"> */}
        {/*           Single */}
        {/*         </span> */}
        {/*       </div> */}
        {/*       <span className="text-lg font-bold text-neutral-800"> */}
        {/*         {new Intl.NumberFormat("en-US", { */}
        {/*           style: "currency", */}
        {/*           currency: "USD", */}
        {/*           maximumFractionDigits: 0, */}
        {/*         }).format(destination.expenditure.single.amount)} */}
        {/*         <span className="text-xs font-medium text-neutral-400"> */}
        {/*           /mo */}
        {/*         </span> */}
        {/*       </span> */}
        {/*     </div> */}
        {/**/}
        {/*     <div className="h-8 w-px bg-neutral-200" /> */}
        {/**/}
        {/*     <div className="flex flex-col gap-0.5"> */}
        {/*       <div className="flex items-center gap-1 text-neutral-400"> */}
        {/*         <Lucide.UsersRound className="size-3.5" /> */}
        {/*         <span className="text-[10px] font-bold tracking-wider uppercase"> */}
        {/*           Couple */}
        {/*         </span> */}
        {/*       </div> */}
        {/*       <span className="text-lg font-bold text-neutral-800"> */}
        {/*         {new Intl.NumberFormat("en-US", { */}
        {/*           style: "currency", */}
        {/*           currency: "USD", */}
        {/*           maximumFractionDigits: 0, */}
        {/*         }).format(destination.expenditure.couple.amount)} */}
        {/*         <span className="text-xs font-medium text-neutral-400"> */}
        {/*           /mo */}
        {/*         </span> */}
        {/*       </span> */}
        {/*     </div> */}
        {/*   </div> */}
        {/**/}
        {/*   <div className="flex items-center justify-center gap-1.5 border-t border-neutral-200/60 pt-2"> */}
        {/*     <Lucide.Calculator className="size-3.5" /> */}
        {/*     <span className="text-xs font-medium text-neutral-800"> */}
        {/*       Find your retirement costs */}
        {/*     </span> */}
        {/*     <Lucide.MoveRight className="ml-auto size-4 opacity-100" /> */}
        {/*   </div> */}
        {/* </div> */}

        <div className="mb-4 rounded-xl border border-neutral-100 bg-neutral-50">
          <ul className="scrollbar-none flex h-48 flex-col gap-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-neutral-800 uppercase">
                Important caveats
              </span>
              <Lucide.CircleAlert className="size-4 stroke-neutral-800" />
            </div>
            <div />
            {cons.map((con, i) => (
              <li key={`con-${i}`} className="flex items-center gap-2">
                <Lucide.CircleSmall className="size-3 shrink-0 stroke-neutral-800" />
                <span className="text-sm font-medium text-neutral-600 first-letter:uppercase">
                  {con}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-1 p-2">
        <Wouter.Link href={`/${destination.id}/overview`}>
          <div className="flex items-center justify-center rounded-full bg-black p-3 text-sm font-semibold whitespace-nowrap text-white transition-all hover:bg-primary hover:shadow-lg active:scale-95">
            View Details
          </div>
        </Wouter.Link>

        {/* <button */}
        {/*   onClick={() => toggleDestination(destination)} */}
        {/*   className={`flex items-center justify-center rounded-full border p-3 text-sm font-semibold whitespace-nowrap transition-all hover:shadow-lg active:scale-95 ${ */}
        {/*     isSelected */}
        {/*       ? "border-accent bg-accent text-white" */}
        {/*       : "border-neutral-200 bg-white text-neutral-600 hover:bg-accent" */}
        {/*   }`} */}
        {/* > */}
        {/*   {isSelected ? "Selected" : "Compare"} */}
        {/* </button> */}
      </div>
    </article>
  );
}
