import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <Wouter.Link href="/">
        <div className="text-lg font-bold tracking-tight">
          Retire<span className="text-primary">Away</span>
        </div>
      </Wouter.Link>

      <div className="flex items-center gap-4 lg:gap-4">
        <Wouter.Link href="/matchmaker">
          <div className="flex items-center gap-1">
            <Lucide.Sparkles className="hidden size-4 stroke-neutral-900 lg:inline" />
            <div className="text-sm leading-none font-bold tracking-tight text-neutral-900">
              Match<span className="text-primary">maker</span>
            </div>
          </div>
        </Wouter.Link>

        {/* menu button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-1 outline-none"
          >
            <Lucide.ChartNoAxesGantt className="size-5 stroke-neutral-500" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col p-1">
                <Wouter.Link
                  href="/matchmaker"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Lucide.Sparkles className="size-4" />
                  Matchmaker
                </Wouter.Link>
                <Wouter.Link
                  href="/explore"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Lucide.Compass className="size-4" />
                  Explore
                </Wouter.Link>
                <div className="my-1 h-px bg-neutral-100" />
                <Wouter.Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  <Lucide.LogIn className="size-4" />
                  Log In
                </Wouter.Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
