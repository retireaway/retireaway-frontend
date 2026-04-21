import * as React from "react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";
import * as WouterHash from "wouter/use-hash-location";
import { useComparison } from "@/contexts/comparison";

export function ComparisonBar() {
  const [location] = WouterHash.useHashLocation();
  const { selectedDestinations, clearDestinations, toggleDestination } =
    useComparison();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (
    selectedDestinations.length === 0 ||
    location === "/" ||
    location === "/compare" ||
    location === "/matchmaker"
  ) {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
          aria-label="Open comparison"
        >
          <Lucide.ArrowRightLeft className="size-6" />
          {selectedDestinations.length > 0 && (
            <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white ring-2 ring-white">
              {selectedDestinations.length}
            </span>
          )}
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="animate-in zoom-in-95 w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-800">
                Compare Destinations
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
              >
                <Lucide.X className="size-5" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-500">
                {selectedDestinations.length} destinations selected
              </span>
              <button
                onClick={clearDestinations}
                className="text-xs font-bold tracking-wider text-accent uppercase hover:opacity-80"
              >
                Clear all
              </button>
            </div>

            <ul className="mb-6 flex flex-col gap-3">
              {selectedDestinations.map((destination) => (
                <li
                  key={destination.id}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-3 transition-colors hover:border-neutral-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 overflow-hidden rounded-xl">
                      <img
                        src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                        alt={destination.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-neutral-700">
                        {destination.name}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {destination.region}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDestination(destination)}
                    className="rounded-full p-2 text-neutral-300 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${destination.name}`}
                  >
                    <Lucide.Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2">
              <Wouter.Link
                href="/compare"
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center justify-center rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                  selectedDestinations.length >= 2
                    ? "bg-primary hover:bg-primary/90 hover:shadow-primary/20"
                    : "pointer-events-none bg-neutral-300"
                }`}
              >
                Compare Now
              </Wouter.Link>
              {selectedDestinations.length < 2 && (
                <p className="text-center text-xs text-neutral-400">
                  Select at least 2 destinations to compare
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
