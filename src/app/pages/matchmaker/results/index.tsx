import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import destinations from "@/data/destinations.json" with { type: "json" };
import criteria from "@/data/criteria.json" with { type: "json" };
import type { Destination } from "@/types/destination";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function Results() {
  const matchedDestinations = React.useMemo(() => {
    return [...destinations]
      .sort(() => 0.5 - Math.random())
      .slice(0, 16) as readonly Destination[];
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-white text-neutral-900">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row">
        {/* Left Side: Hero (Sticky on desktop) */}
        <aside className="lg:sticky lg:top-16 lg:h-[calc(100svh-64px)] lg:w-1/3 lg:min-w-80">
          <Hero />
        </aside>

        <main className="flex-1 px-6 py-12 lg:px-12 lg:py-24">
          <section className="animate-in fade-in slide-in-from-bottom-8 mb-20 duration-1000">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-2">
              {matchedDestinations.map((destination, index) => {
                const simulatedScore =
                  98 - index * 3 - Math.floor(Math.random() * 2);

                const randomPros = [...criteria]
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 3) + 2)
                  .map((c) => c.pro);

                const randomCons = [...criteria]
                  .sort(() => 0.5 - Math.random())
                  .slice(0, Math.floor(Math.random() * 3) + 2)
                  .map((c) => c.con);

                return (
                  <li key={destination.id}>
                    <Card
                      destination={destination}
                      score={Math.max(simulatedScore, 60)}
                      pros={randomPros}
                      cons={randomCons}
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

export function Card({
  destination,
  score,
  pros,
  cons,
}: {
  destination: Destination;
  score: number;
  pros: readonly string[];
  cons: readonly string[];
}) {
  return (
    <article className="relative aspect-[0.8] overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md">
      <img
        loading="lazy"
        src={`/images/destinations/${destination.id}/${destination.id}.webp`}
        className={`absolute top-0 right-0 size-full rounded-t-2xl object-cover object-center`}
        alt={`scenic image of ${destination.name}`}
      />

      <div className="absolute top-0 left-0 size-full rounded-xl bg-linear-to-b from-black/25 from-30% to-black" />

      {/* Match Score Badge */}
      <div className="absolute top-4 right-4 z-20 flex w-full items-center justify-end gap-0.5">
        <div className="rounded-full border border-white/20 bg-black/20 p-3 backdrop-blur-md">
          <span className="block text-xs leading-none font-bold text-white">
            {score}% match
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-6">
        <header>
          <h1 className="text-2xl font-semibold text-white">
            {destination.name}
          </h1>

          <div className="flex flex-row flex-wrap items-center justify-start gap-2 gap-y-0.5">
            <div className="flex flex-row items-center justify-center gap-0.5 whitespace-nowrap">
              <Lucide.MapPin className="size-3.5 text-white/90" />
              <span className="text-sm font-medium text-white/90">
                {destination.region}
              </span>
            </div>

            <Lucide.Circle className="size-1.5 fill-accent stroke-accent" />

            <div className="flex flex-row items-center justify-center gap-0.5 whitespace-nowrap">
              <Lucide.Snowflake className="size-3.5 text-white/90" />
              <span className="text-sm font-medium text-white/90">
                {destination.climate}
              </span>
            </div>
          </div>

          <div className="h-4" />

          <ul className="mb-6 flex flex-col items-start gap-1">
            {pros.slice(0, 2).map((pro, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/5 px-2.5 py-1.5 backdrop-blur-sm"
              >
                <Lucide.Check
                  className="size-3 text-green-400"
                  strokeWidth={3}
                />
                <span className="text-xs font-medium text-white first-letter:uppercase">
                  {pro}
                </span>
              </li>
            ))}

            {cons.slice(0, 1).map((con, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/5 px-2.5 py-1.5 backdrop-blur-sm"
              >
                <Lucide.X className="size-3 text-red-400" strokeWidth={3} />
                <span className="text-xs font-medium text-white first-letter:uppercase">
                  {con}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-row gap-1">
            <Wouter.Link href={`/${destination.id}/overview`}>
              <div className="flex w-min items-center justify-center rounded-full bg-accent px-3 py-2 text-xs font-semibold whitespace-nowrap text-white transition-all hover:bg-accent hover:shadow-lg active:scale-95">
                View Details
              </div>
            </Wouter.Link>

            {/* <Wouter.Link href="/compare"> */}
            {/*   <div className="flex w-min items-center justify-center rounded-full border border-neutral-900 bg-white px-3 py-2 text-xs font-semibold whitespace-nowrap text-neutral-600 transition-all hover:bg-accent hover:shadow-lg active:scale-95"> */}
            {/*     Compare */}
            {/*   </div> */}
            {/* </Wouter.Link> */}
          </div>
        </header>
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section className="mt-8 flex flex-col items-start justify-center p-6 lg:mt-0 lg:h-full lg:p-6 lg:text-left">
      <header className="w-full">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          Your Perfect
          <br />
          <span className="text-primary">Matches</span>
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
              <Lucide.RotateCcw className="size-4 stroke-white" />
              Retake Quiz
            </div>
          </Wouter.Link>

          <Wouter.Link href="/explore">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-500">
              <Lucide.Telescope className="size-4 stroke-neutral-400" />
              Explore
            </div>
          </Wouter.Link>
        </div>
      </header>
    </section>
  );
}
