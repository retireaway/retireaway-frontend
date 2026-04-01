import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col bg-white text-neutral-900">
      <div className="flex h-svh flex-col">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-100 bg-white/80 px-6 py-4 backdrop-blur-md">
          <Wouter.Link href="/">
            <div className="text-2xl font-bold tracking-tight">
              Retire<span className="text-blue-500">Away</span>
            </div>
          </Wouter.Link>

          <div className="flex items-center gap-8">
            <Wouter.Link href="/explore">
              <div className="text-sm font-semibold text-neutral-600 transition-colors hover:text-blue-500">
                Explore
              </div>
            </Wouter.Link>
            <Wouter.Link href="/matchmaker">
              <div className="text-sm font-semibold text-neutral-600 transition-colors hover:text-blue-500">
                Matchmaker
              </div>
            </Wouter.Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <section className="mx-auto mb-24 max-w-3xl">
            <header className="mb-6 lg:mb-12">
              <h1 className="mb-2 text-5xl font-extrabold tracking-tight text-neutral-900 md:text-7xl lg:mb-6">
                Find your <span className="text-blue-500">perfect</span> home
                abroad.
              </h1>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-500 md:text-xl">
                Your comprehensive research hub for finding your perfect
                retirement paradise.{" "}
                <span className="font-semibold">Explore, Plan and Connect</span>
              </p>
            </header>

            <div className="flex flex-col items-center justify-center gap-x-2 gap-y-2 sm:flex-row">
              <Wouter.Link href="/matchmaker">
                <div className="flex h-14 items-center justify-center rounded-full bg-blue-500 px-8 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
                  <Lucide.Sparkles className="mr-2 size-5" />
                  Start Matchmaker
                </div>
              </Wouter.Link>
              <Wouter.Link href="/explore">
                <div className="flex h-14 items-center justify-center rounded-full border-2 border-neutral-200 bg-transparent px-8 text-lg font-bold text-neutral-700 transition-all hover:border-blue-500 hover:text-blue-600 active:scale-95">
                  Explore Destinations
                </div>
              </Wouter.Link>
            </div>
          </section>
        </main>
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-neutral-100 bg-white px-6 py-6 text-center text-sm font-semibold text-neutral-500">
        <p>© 2026 RetireAway. All rights reserved.</p>
      </footer>
    </div>
  );
}
