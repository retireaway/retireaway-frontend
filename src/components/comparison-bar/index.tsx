import * as Lucide from "lucide-react";
import * as Wouter from "wouter";
import { useComparison } from "@/contexts/comparison";

export function ComparisonBar() {
  const [location] = Wouter.useLocation();
  const { selectedDestinations, clearDestinations, toggleDestination } =
    useComparison();

  if (selectedDestinations.length === 0 || location === "/compare") {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl">
        <div className="mb-2 flex items-center justify-between gap-8">
          <span className="text-sm font-semibold text-neutral-600">
            Compare ({selectedDestinations.length})
          </span>
          <button
            onClick={clearDestinations}
            className="text-xs font-medium text-neutral-400 hover:text-neutral-600"
          >
            Clear all
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {selectedDestinations.map((destination) => (
            <li
              key={destination.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-neutral-50 p-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                  alt={destination.name}
                  className="size-10 rounded-md object-cover"
                />
                <span className="text-sm font-medium text-neutral-700">
                  {destination.name}
                </span>
              </div>
              <button
                onClick={() => toggleDestination(destination)}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
              >
                <Lucide.X className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        {selectedDestinations.length >= 2 && (
          <Wouter.Link
            href="/compare"
            className="mt-2 block w-full rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-primary/90"
          >
            Compare Now
          </Wouter.Link>
        )}
      </div>
    </div>
  );
}
