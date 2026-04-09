import * as Wouter from "wouter";
import { Footer } from "@/components/footer";

export function Home() {
  return (
    <div>
      <div className="flex min-h-svh flex-col">
        <Hero />
      </div>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex grow flex-col items-center overflow-hidden bg-[url(/images/3oj4b8ip.jpg)] bg-cover bg-center">
      <div className="absolute top-0 left-0 z-1 size-full bg-black/35" />

      <div className="z-2 p-4">
        <Wouter.Link href="/">
          <div className="text-center text-xl font-bold tracking-tight text-white">
            Retire<span className="text-primary">Away</span>
          </div>
        </Wouter.Link>
      </div>

      <header className="z-2 flex max-w-3xl grow flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-center text-6xl font-extrabold tracking-tight text-white md:text-7xl">
          Find your perfect
          <span className="text-white"> Retirment</span>
          <span className="hidden md:inline"> abroad</span>
        </h1>

        <p className="mx-auto mb-8 text-center text-lg leading-tight font-medium text-white/90 md:text-xl">
          <span className="">
            Compare costs, healthcare, safety, life expectancy, and visas.
          </span>
          <span className="hidden md:block">
            Connect with local experts to relocate seamlessly.
          </span>
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:flex-row md:gap-2">
          <Wouter.Link href="/matchmaker">
            <div className="rounded-full border border-neutral-900 bg-primary px-6 py-3">
              <span className="text-center text-sm font-bold whitespace-nowrap text-white md:text-lg">
                Find Your Match
              </span>
            </div>
          </Wouter.Link>
        </div>
      </header>
    </section>
  );
}
