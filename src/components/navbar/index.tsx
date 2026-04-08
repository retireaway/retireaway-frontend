import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <Wouter.Link href="/">
        <div className="text-lg font-bold tracking-tight">
          Retire<span className="text-primary">Away</span>
        </div>
      </Wouter.Link>

      <div className="flex items-center gap-4 lg:gap-4">
        <Wouter.Link href="/explore">
          <div className="flex items-center gap-1">
            <Lucide.Telescope className="hidden size-4 stroke-neutral-600 lg:inline" />
            <div className="text-sm font-bold text-neutral-900 transition-colors hover:text-primary">
              Explore
            </div>
          </div>
        </Wouter.Link>

        <Wouter.Link href="/matchmaker">
          <div className="flex items-center gap-1">
            <Lucide.Sparkles className="hidden size-4 stroke-neutral-900 lg:inline" />
            <div className="text-sm leading-none font-bold tracking-tight text-neutral-900">
              Match<span className="text-primary">maker</span>
            </div>
          </div>
        </Wouter.Link>
      </div>
    </nav>
  );
}
