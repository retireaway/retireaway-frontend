import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <Wouter.Link href="/">
        <div className="text-2xl font-bold tracking-tight">
          Retire<span className="text-primary">Away</span>
        </div>
      </Wouter.Link>

      <button type="button" className="lg:hidden">
        <Lucide.ChartNoAxesGantt className="size-6 text-neutral-500" />
      </button>

      <div className="hidden items-center gap-4 lg:flex lg:gap-8">
        <Wouter.Link href="/explore">
          <div className="text-sm font-semibold text-neutral-500 transition-colors hover:text-primary">
            Explore
          </div>
        </Wouter.Link>
        <Wouter.Link href="/matchmaker">
          <div className="text-sm font-semibold text-neutral-500 transition-colors hover:text-primary">
            Matchmaker
          </div>
        </Wouter.Link>
      </div>
    </nav>
  );
}
