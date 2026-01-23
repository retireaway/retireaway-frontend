import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import Fuse from "fuse.js";
import React from "react";

import { Chip } from "@/components/chip";

import { Rating } from "@/components/rating";
import { climateToIcon, gradeToColor } from "@/utils/mappings";

import countries from "@/data/countries.json" with { type: "json" };

type Country = Readonly<(typeof countries)[number]>;

export function Home() {
  const scrollToTop = useScrollToTop();
  const [params, setParams] = Wouter.useSearchParams();

  const allTags: readonly string[] = React.useMemo(() => {
    return [...new Set(countries.flatMap((country) => country.tags))];
  }, [countries]);

  const allRegions: readonly string[] = React.useMemo(() => {
    return [...new Set(countries.map((country) => country.region))];
  }, [countries]);

  const filtrate: readonly Country[] = React.useMemo(() => {
    const filterRegion = params.get("region");
    const filterTags = params.getAll("tag");

    const predRegion = (country: Country, region: null | string): boolean => {
      if (region === null) return true;
      return region === country.region;
    };

    const predTags = (country: Country, tags: string[]): boolean => {
      if (tags.length === 0) return true;
      return country.tags.some((item) => tags.includes(item));
    };

    return countries.filter((country) => {
      return predRegion(country, filterRegion) && predTags(country, filterTags);
    });
  }, [countries, params.toString()]);

  const fuse = React.useMemo(() => {
    return new Fuse(filtrate, {
      keys: ["name"],
      threshold: 0.2,
      ignoreLocation: true,
    });
  }, [filtrate]);

  const search = params.get("search");

  const searchResults: readonly Country[] = React.useMemo(() => {
    if (search === null || search === "") {
      return filtrate;
    }

    return fuse.search(search).map((result) => result.item);
  }, [search, filtrate]);

  return (
    <section className="flex min-h-svh flex-col">
      <Hero
        search={params.get("search") ?? ""}
        handleChange={(search) => {
          scrollToTop();
          setParams([["search", search]], { replace: true });
        }}
      />
      <Regions regions={allRegions} />
      <div className="h-px bg-neutral-100" />
      <Tags tags={allTags} />
      <div className="h-px bg-neutral-100" />

      <section
        id="destination-scroll-container"
        className="flex h-0 grow flex-col gap-4 overflow-y-scroll bg-neutral-50/50 p-4"
      >
        <header>
          <h3 className="text-center text-xs font-medium text-neutral-400">
            {searchResults.length === 0
              ? "No matching destinations"
              : searchResults.length === 1
                ? "Showing 1 destination"
                : `Showing ${searchResults.length} destinations`}
          </h3>
        </header>

        <ul className="flex flex-col gap-8">
          {searchResults.map((country) => {
            return (
              <li key={country.id}>
                <DestinationCard destination={country} />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

function Hero({
  search,
  handleChange,
}: {
  search: string;
  handleChange: (search: string) => void;
}) {
  return (
    <section className="flex flex-col gap-8 bg-neutral-500 bg-[url(/images/bg-hero.jpg)] bg-cover bg-center px-4 py-6 pt-12 bg-blend-multiply">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-white">
          Plan your dream retirement
        </h1>
        <p className="text-base text-white">
          Compare destinations worldwide. Connect with local experts. Plan your
          move.
        </p>
      </header>

      <div className="flex flex-row gap-2 rounded-full border-2 border-neutral-200 bg-white px-1 py-1 has-focus:border-neutral-400">
        <input
          placeholder="Enter destination name..."
          className="w-0 grow pl-4 text-base text-neutral-600 outline-none"
          name="search"
          value={search}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        />
        <button className="flex items-center justify-center gap-2 rounded-full border-1 border-blue-500 bg-blue-500 p-2 px-3">
          <span className="text-sm text-white">Search</span>
          <Lucide.Search className="size-4 text-white" />
        </button>
      </div>
    </section>
  );
}

function Regions({ regions }: { regions: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollToTop();

  return (
    <section className="px-4 py-4">
      <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
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
    </section>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollToTop();

  return (
    <section className="p-4">
      <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-1 overflow-x-auto">
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
                  fill={params.has("tag", tag) ? "dark" : "light"}
                  size="xs"
                >
                  {tag}
                </Chip>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function DestinationCard({ destination }: { destination: Country }) {
  const ClimateIcon = climateToIcon(destination.climate);

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });

  const [imageStatus, setImageStatus] = React.useState<boolean>(false);

  return (
    <article className="rounded-2xl border-1 border-neutral-100 bg-white">
      <div className="relative h-56 rounded-t-2xl bg-black">
        <img
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className={`absolute inset-0 h-full w-full rounded-t-2xl object-cover ${imageStatus || "hidden"}`}
          alt={`scenic image of ${destination.name}`}
          onLoad={() => setImageStatus(true)}
          onError={() => {
            console.log("image not found:", destination.id);
          }}
        />

        <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/0 from-30% to-black/60" />

        <div className="absolute top-0 right-0 flex w-full justify-end p-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white ${gradeToColor(destination.grade).bg} text-xl font-bold text-white`}
          >
            {destination.grade}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <header>
            <div className="grow">
              <h1 className="text-2xl font-semibold text-white">
                {destination.name}
              </h1>
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="flex flex-row items-center justify-center gap-0.5">
                  <Lucide.MapPin className="size-3.5 text-white" />
                  <span className="text-sm font-medium text-white">
                    {destination.region}
                  </span>
                </div>
                <Lucide.Circle className="size-1.5 fill-yellow-400 stroke-yellow-400" />
                <div className="flex flex-row items-center justify-center gap-0.5">
                  <ClimateIcon className="size-3.5 text-white" />
                  <span className="text-sm font-medium text-white">
                    {destination.climate}
                  </span>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-4 gap-2">
          <Rating
            color={
              gradeToColor(destination.ratings.healthcareQuality.grade).color
            }
            grade={destination.ratings.healthcareQuality.grade}
            text="Health"
          />
          <Rating
            color={gradeToColor(destination.ratings.personalSafety.grade).color}
            grade={destination.ratings.personalSafety.grade}
            text="Safety"
          />
          <Rating
            color={gradeToColor(destination.ratings.affordability.grade).color}
            grade={destination.ratings.affordability.grade}
            text="Cost"
          />
          <Rating
            color={gradeToColor(destination.ratings.visaEase.grade).color}
            grade={destination.ratings.visaEase.grade}
            text="Visa"
          />
        </div>

        <div className="grid grid-cols-2 rounded-xl border-1 border-neutral-100 bg-neutral-50 p-4">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs font-semibold text-neutral-400 uppercase">
              single
            </span>
            <span
              className={`text-2xl font-bold ${gradeToColor(destination.ratings.affordability.grade).text} uppercase`}
            >
              {destination.expenditure.single.currency}
              {formatter.format(destination.expenditure.single.amount)}
            </span>
            <span className="text-xs font-medium text-neutral-400">/month</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs font-semibold text-neutral-400 uppercase">
              couple
            </span>
            <span
              className={`text-2xl font-bold ${gradeToColor(destination.ratings.affordability.grade).text} uppercase`}
            >
              {destination.expenditure.couple.currency}
              {formatter.format(destination.expenditure.couple.amount)}
            </span>
            <span className="text-xs font-medium text-neutral-400">/month</span>
          </div>
        </div>

        <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
          {destination.tags.map((region) => {
            return (
              <li key={region} className="snap-start">
                <Chip color="plain" fill="light" size="sm">
                  {region}
                </Chip>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

function useScrollToTop() {
  const target = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById("destination-scroll-container");

    if (element === null) {
      console.warn("[element not found]:", "destination-scroll-container");
    }

    target.current = element;
  }, []);

  return () => {
    target.current?.scroll({ behavior: "smooth", top: 0 });
  };
}
