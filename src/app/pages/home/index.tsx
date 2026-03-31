import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

export function Home() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-neutral-900 px-4 py-20 text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-hero.jpg')" }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-neutral-900/60 to-neutral-900" />

      {/* Hero Content */}
      <section className="relative z-20 mx-auto max-w-4xl text-center">
        <header className="animate-in fade-in slide-in-from-bottom-4 mb-12 duration-1000">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            Retire<span className="text-orange-500">Away</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
            Discover the world's most welcoming retirement destinations. Whether
            you're seeking tropical beaches or historic European charm, we'll
            help you find where you belong.
          </p>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Wouter.Link href="/matchmaker">
            <div className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-orange-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white transition-transform group-hover:scale-110">
                <Lucide.Sparkles className="size-6" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold">Matchmaker</h2>
              <p className="mb-6 leading-relaxed text-neutral-400">
                Take our personalized quiz to discover the top 5 destinations
                tailored specifically to your lifestyle and budget.
              </p>
              <span className="mt-auto flex items-center font-medium text-orange-400">
                Start Your Search{" "}
                <Lucide.ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Wouter.Link>

          <Wouter.Link href="/explore">
            <div className="group flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-8 text-left transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-transform group-hover:scale-110">
                <Lucide.Map className="size-6" />
              </div>
              <h2 className="mb-2 text-2xl font-semibold">Explore</h2>
              <p className="mb-6 leading-relaxed text-neutral-400">
                Browse our comprehensive directory of global retirement hotspots
                with powerful search and specialized filters.
              </p>
              <span className="mt-auto flex items-center font-medium text-blue-400">
                Browse All Destinations{" "}
                <Lucide.ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Wouter.Link>
        </div>
      </section>
    </div>
  );
}
