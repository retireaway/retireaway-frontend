import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import Fuse from "fuse.js";
import React from "react";

import { Chip } from "@/components/chip";

import destinations from "@/data/destinations.json" with { type: "json" };
import { DestinationCardList } from "@/components/destination-card";
import type { Destination } from "@/types/destination";
import { preferentialSort } from "@/utils/array";

export function Home() {
  const [params] = Wouter.useSearchParams();

  const allTags: readonly string[] = React.useMemo(() => {
    return [
      ...new Set(destinations.flatMap((destination) => destination.tags)),
    ];
  }, [destinations]);

  const allRegions: readonly string[] = React.useMemo(() => {
    const regions = [
      ...new Set(destinations.map((destination) => destination.region)),
    ];
    const sorted = preferentialSort(
      regions,
      ["Asia", "Europe", "Americas", "Oceania", "Middle East & North Africa"],
      (a, b) => a === b,
    );
    return sorted;
  }, [destinations]);

  const filtrate: readonly Destination[] = React.useMemo(() => {
    const filterRegion = params.get("region");
    const filterTags = params.getAll("tag");

    const predRegion = (
      destination: Destination,
      region: null | string,
    ): boolean => {
      if (region === null) return true;
      return region === destination.region;
    };

    const predTags = (destination: Destination, tags: string[]): boolean => {
      if (tags.length === 0) return true;
      return tags.every((item) => destination.tags.includes(item));
    };

    return destinations.filter((destination) => {
      return (
        predRegion(destination, filterRegion) &&
        predTags(destination, filterTags)
      );
    });
  }, [destinations, params.toString()]);

  const fuse = React.useMemo(() => {
    return new Fuse(filtrate, {
      keys: ["name"],
      threshold: 0.2,
      ignoreLocation: true,
    });
  }, [filtrate]);

  const search = params.get("search");

  const searchResults: readonly Destination[] = React.useMemo(() => {
    if (search === null || search === "") {
      return filtrate;
    }

    return fuse.search(search).map((result) => result.item);
  }, [search, filtrate]);

  return (
    <section className="flex min-h-svh flex-col">
      <Hero />

      <ControlPanel tags={allTags} regions={allRegions} />

      <section className="flex min-h-240 flex-col gap-4 bg-neutral-50/50 p-4">
        <header>
          <h3 className="text-center text-xs font-medium text-neutral-400">
            {searchResults.length === 0
              ? "No matching destinations"
              : searchResults.length === 1
                ? "Showing 1 destination"
                : `Showing ${searchResults.length} destinations`}
          </h3>
        </header>

        <DestinationCardList destinations={searchResults} />
      </section>
    </section>
  );
}

function Hero() {
  return (
    <section id="hero" className="flex flex-col gap-8 px-4 py-6 pt-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-semibold text-neutral-700">
          Plan your dream retirement
        </h1>
        <p className="text-center text-base text-neutral-500">
          Compare destinations worldwide. Connect with local experts. Plan your
          move.
        </p>
      </header>
    </section>
  );
}

function useScrollControlPanelToTop() {
  const hero = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const target = document.getElementById("hero");
    hero.current = target;
  }, []);

  return () => {
    if (hero.current === null) {
      console.warn("Element with id hero not found");
      return;
    }

    const height = hero.current.getBoundingClientRect().height;

    window.scrollTo({ behavior: "smooth", top: height - 1 });
  };
}

function ControlPanel({
  regions,
  tags,
}: {
  regions: readonly string[];
  tags: readonly string[];
}) {
  const [view, setView] = React.useState<"Search" | "Filters">("Filters");
  const scrollToTop = useScrollControlPanelToTop();

  function toggleView() {
    setView(view === "Filters" ? "Search" : "Filters");
    scrollToTop();
  }

  return (
    <section
      className="sticky top-0 left-0 z-50 w-full bg-white"
      id="control-panel"
    >
      {view === "Filters" ? (
        <>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full max-w-min flex-row gap-2 p-4">
            <button onClick={toggleView}>
              <Chip color="blue" fill="light" size="sm">
                Search
                <Lucide.Search className="size-4" />
              </Chip>
            </button>
            <div className="w-0.5 bg-neutral-100" />
            <Regions regions={regions} />
          </div>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full max-w-min flex-row gap-2 p-4 lg:max-w-240">
            <Tags tags={tags} />
          </div>
          <ControlPanelDivider />
        </>
      ) : (
        <>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full max-w-min flex-row gap-2 p-4 lg:max-w-200">
            <button onClick={toggleView}>
              <Chip color="blue" fill="light" size="sm">
                Filters
                <Lucide.SlidersHorizontal className="size-4" />
              </Chip>
            </button>
            <div className="w-0.5 bg-neutral-100" />
            <SearchBar />
          </div>
          <ControlPanelDivider />
        </>
      )}
    </section>
  );
}

function SearchBar() {
  const [params, setParams] = Wouter.useSearchParams();

  return (
    <input
      placeholder="Enter destination name..."
      className="w-0 grow rounded-full border-1 border-neutral-200 bg-neutral-50 pl-4 text-sm text-neutral-600 outline-none focus:border-neutral-400"
      name="search"
      value={params.get("search") ?? ""}
      onChange={(event) => {
        const search = event.target.value;
        if (search === "") {
          params.delete("search");
        } else {
          params.set("search", search);
        }

        setParams(params, { replace: true });
      }}
    />
  );
}

function ControlPanelDivider() {
  return <div className="h-0.5 bg-neutral-100" />;
}

function Regions({ regions }: { regions: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollControlPanelToTop();

  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
      <li className="snap-start">
        <button
          type="button"
          onClick={() => {
            scrollToTop();
            params.delete("region");
            setParams(params, { replace: true });
          }}
        >
          <Chip
            color={params.get("region") === null ? "blue" : "neutral"}
            fill={params.get("region") === null ? "dark" : "light"}
            size="sm"
          >
            All
          </Chip>
        </button>
      </li>
      {regions.map((region) => {
        return (
          <li key={region} className="snap-start">
            <button
              type="button"
              onClick={() => {
                scrollToTop();

                if (params.has("region", region)) {
                  params.delete("region");
                  setParams(params, { replace: true });
                  return;
                }

                params.set("region", region);
                setParams(params, { replace: true });
              }}
            >
              <Chip
                color={params.has("region", region) ? "blue" : "neutral"}
                fill={params.has("region", region) ? "dark" : "light"}
                size="sm"
              >
                {region}
              </Chip>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollControlPanelToTop();

  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-1 overflow-x-auto lg:flex-wrap lg:justify-center">
      {tags.map((tag) => {
        return (
          <li key={tag} className="snap-start">
            <button
              type="button"
              onClick={() => {
                scrollToTop();
                if (params.has("tag", tag)) {
                  const entries = Array.from(params.entries()).filter(
                    ([key, value]) => {
                      if (key !== "tag") {
                        return true;
                      }

                      return value !== tag;
                    },
                  );

                  setParams(entries, { replace: true });
                  return;
                }

                params.append("tag", tag);
                setParams(params, { replace: true });
              }}
            >
              <Chip
                color={params.has("tag", tag) ? "blue" : "neutral"}
                fill={params.has("tag", tag) ? "light" : "light"}
                size="xs"
              >
                {tag}
              </Chip>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
