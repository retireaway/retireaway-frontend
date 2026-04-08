import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export function Home() {
  return (
    <div>
      <div className="flex min-h-svh flex-col">
        <Navbar />

        <Hero />
      </div>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="mb-24 flex grow flex-col items-center justify-center">
      <header className="max-w-3xl p-4">
        <h1 className="mb-4 text-center text-6xl font-extrabold tracking-tight text-neutral-900 md:text-7xl">
          Find your perfect
          <span className="text-primary"> Retirment</span>
          <span className="hidden md:inline"> abroad</span>
        </h1>

        <p className="mx-auto mb-8 text-center text-lg leading-tight font-medium text-neutral-500 md:text-xl">
          <span className="">
            Compare costs, healthcare, safety, life expectancy, and visas.
          </span>
          <span className="hidden md:block">
            Connect with local experts to relocate seamlessly.
          </span>
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:flex-row md:gap-2">
          <Wouter.Link href="/matchmaker">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-900 bg-primary px-6 py-3 text-sm font-bold whitespace-nowrap text-white md:text-lg">
              <Lucide.Sparkles className="size-4 stroke-white" />
              Matchmaker
            </div>
          </Wouter.Link>

          <Wouter.Link href="/explore">
            <div className="flex items-center justify-center gap-1 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-neutral-500 md:text-lg">
              <Lucide.Telescope className="size-4 stroke-neutral-400" />
              Explore
            </div>
          </Wouter.Link>
        </div>
      </header>
    </section>
  );
}
