import React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";

import pros from "@/data/pros.json" with { type: "json" };
import cons from "@/data/cons.json" with { type: "json" };
import cities from "@/data/cities.json" with { type: "json" };
import destinations from "@/data/destinations.json" with { type: "json" };
import resources from "@/data/resources.json" with { type: "json" };
import providers from "@/data/providers.json" with { type: "json" };
import providerCategories from "@/data/provider_categories.json" with { type: "json" };

import { climateToIcon, gradeToColor } from "@/utils/mappings";
import type { Cost, Destination } from "@/types/destination";
import type { City } from "@/types/city";
import type { Provider, ProviderCategoryInfo } from "@/types/provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useComparison } from "@/contexts/comparison";
import { useUser } from "@/contexts/user";
import * as UserUtils from "@/utils/user";

import InternationalLivingLogo from "@/assets/svg/international-living-logo.svg?react";

type Tab = "overview" | "resources" | "calculator" | "providers";

function isTab(value: unknown): value is Tab {
  const isOverview = value === "overview";
  const isResources = value === "resources";
  const isCalculator = value === "calculator";
  const isProviders = value === "providers";
  return isOverview || isResources || isCalculator || isProviders;
}

export function DestinationProfile() {
  const params = Wouter.useParams();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [params["id"]]);

  if (params["id"] === undefined) {
    return (
      <section>
        <header>
          <h1>Missing Parameter :id</h1>
          <p>Expected paramter ":id" in url "/:id/:tab"</p>
        </header>
      </section>
    );
  }

  if (!isTab(params["tab"])) {
    return (
      <section>
        <header>
          <h1>Invalid Parameter :tab</h1>
          <p>
            Must be one of "overview", "resources", "calculator", "providers"
          </p>
        </header>
      </section>
    );
  }

  const destination = destinations.find((d) => d.id === params["id"]);

  if (destination === undefined) {
    return (
      <section>
        <header>
          <h1>Destination Not Found</h1>
          <p>No destination with id {params["id"]}</p>
        </header>
      </section>
    );
  }

  const topCities: readonly City[] = cities.filter((city) =>
    destination.topCities.includes(city.id),
  );

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="relative m-auto flex max-w-425 flex-col xl:flex-row xl:gap-4">
          <div className="flex basis-3/5 flex-col xl:sticky xl:top-16 xl:left-0 xl:h-[calc(100svh-64px)] xl:gap-4 xl:p-8 xl:pr-0">
            <Hero destination={destination} />
            <ul className="grid grid-cols-2 gap-4 border-b border-neutral-100 bg-neutral-50/50 px-4 py-6 xl:grid-cols-4 xl:rounded-xl xl:border">
          <li className="">
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl">
              <span className="text-xs font-medium text-neutral-400 capitalize">
                english usage
              </span>
              <span className="text-base font-semibold text-neutral-600">
                {destination.englishUsage}
              </span>
            </div>
          </li>
          <li>
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl">
              <span className="text-xs font-medium text-neutral-400 capitalize">
                retirement community
              </span>
              <span className="text-base font-semibold text-neutral-600">
                {destination.retirementCommunity}
              </span>
            </div>
          </li>
          <li>
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl">
              <span className="text-xs font-medium text-neutral-400 capitalize">
                population density
              </span>
              <span className="text-base font-semibold text-neutral-600">
                {destination.populationDensity}
              </span>
            </div>
          </li>
          <li>
            <div className="flex flex-col items-center justify-center gap-1 rounded-xl">
              <span className="text-xs font-medium text-neutral-400 capitalize">
                life expectancy
              </span>
              <span className="text-base font-semibold text-neutral-600">
                {destination.lifeExpectancy} years
              </span>
            </div>
          </li>
        </ul>

        {destination.internationalLiving && (
          <div className="hidden flex-row items-center justify-between gap-2 rounded-xl bg-[#002c4e] p-6 xl:flex">
            <div>
              <h3 className="text-left text-xl leading-[1.5] font-semibold text-white">
                Want to know more about{" "}
                <span className="font-bold text-[#fbe232]">
                  {destination.name}?
                </span>
              </h3>
            </div>

            <div />

            <div>
              <a
                target="blank"
                href={`https://internationalliving.com/countries/${destination.id}/`}
                className="rounded-lg bg-[#fbe232] px-4 py-3 text-sm font-semibold whitespace-nowrap text-[#002c4e]"
              >
                Visit International Living
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex basis-2/5 flex-col gap-8 xl:p-8 xl:pl-0">
        <ul className="grid grid-cols-4 border-b border-neutral-100">
          <li className="flex grow">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/overview`}
              className={`w-full border-b-2 p-4 text-center text-sm ${params["tab"] === "overview" ? "border-primary text-primary" : "border-transparent text-neutral-400"} `}
            >
              Overview
            </Wouter.Link>
          </li>
          <li className="flex grow">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/resources`}
              className={`w-full border-b-2 p-4 text-center text-sm ${params["tab"] === "resources" ? "border-primary text-primary" : "border-transparent text-neutral-400"} `}
            >
              Resources
            </Wouter.Link>
          </li>
          <li className="flex grow">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/calculator`}
              className={`w-full border-b-2 p-4 text-center text-sm ${params["tab"] === "calculator" ? "border-primary text-primary" : "border-transparent text-neutral-400"} `}
            >
              Calculator
            </Wouter.Link>
          </li>
          <li className="flex grow">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/providers`}
              className={`w-full border-b-2 p-4 text-center text-sm ${params["tab"] === "providers" ? "border-primary text-primary" : "border-transparent text-neutral-400"} `}
            >
              Providers
            </Wouter.Link>
          </li>
        </ul>

        {params["tab"] === "overview" && (
          <Overview
            topCities={topCities}
            destination={destination}
            similarDestinations={destinations.filter((d) =>
              destination.similarDestinations.includes(d.id),
            )}
          />
        )}

        {params["tab"] === "resources" && (
          <Resources destination={destination} />
        )}
        {params["tab"] === "calculator" && (
          <Calculator destination={destination} />
        )}
        {params["tab"] === "providers" && (
          <Providers destination={destination} />
        )}
      </div>
    </section>
    </main>
    <Footer />
    </div>
  );
}

function Hero({ destination }: { destination: Destination }) {
  const ClimateIcon = climateToIcon(destination.climate);
  const { toggleDestination, isDestinationSelected } = useComparison();
  const [user, setUser] = useUser();

  const isSelected = isDestinationSelected(destination.id);
  const isSaved = UserUtils.isDestinationSaved(user, destination.id);

  const toggleSave = () => {
    if (isSaved) {
      const savedItem = UserUtils.getSavedDestination(user, destination.id);
      if (savedItem) {
        setUser((prev) => UserUtils.removeSavedItem(prev, savedItem.id));
      }
    } else {
      setUser((prev) => UserUtils.saveDestination(prev, destination));
    }
  };

  return (
    <div className="relative h-72 bg-black xl:h-100 xl:grow xl:rounded-xl">
      <img
        src={`/images/destinations/${destination.id}/${destination.id}.webp`}
        className="absolute inset-0 h-full w-full object-cover xl:rounded-xl"
        alt={`scenic image of ${destination.name}`}
      />

      <div className="absolute inset-0 top-0 left-0 h-full w-full bg-linear-to-b from-black/0 from-30% to-black/75 xl:rounded-xl" />

      <button
        onClick={() => history.back()}
        className="absolute top-0 left-0 flex w-min cursor-pointer items-center justify-start gap-2 p-4"
      >
        <Lucide.ArrowLeft className="size-6 text-white" />
      </button>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {isSelected ? (
          <button
            onClick={() => toggleDestination(destination)}
            className="flex flex-row items-center gap-1 rounded-s-full rounded-e-full border border-accent bg-accent px-3 py-2 transition-all active:scale-95"
          >
            <Lucide.Check className="size-3.5 stroke-white" />
            <span className="text-xs leading-none font-bold text-white">
              Compare
            </span>
          </button>
        ) : (
          <button
            onClick={() => toggleDestination(destination)}
            className="flex flex-row items-center gap-1 rounded-s-full rounded-e-full border border-neutral-400 bg-white px-3 py-2 transition-all hover:bg-neutral-50 active:scale-95"
          >
            <Lucide.GitCompareArrows className="size-3.5 text-neutral-700" />
            <span className="text-xs leading-none font-bold text-neutral-700">
              Compare
            </span>
          </button>
        )}

        <button
          onClick={toggleSave}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-white transition-all hover:bg-neutral-50 active:scale-95"
          aria-label={isSaved ? "Remove from saved" : "Save destination"}
        >
          <Lucide.Heart
            className={`size-5 transition-colors ${
              isSaved
                ? "fill-red-500 stroke-neutral-700"
                : "fill-none stroke-neutral-700"
            }`}
          />
        </button>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <header>
          <div className="grow">
            <h1 className="text-3xl font-semibold text-white">
              {destination.name}
            </h1>
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="flex flex-row items-center justify-center gap-0.5">
                <Lucide.MapPin className="size-4 text-white" />
                <span className="text-base font-medium text-white">
                  {destination.region}
                </span>
              </div>
              <Lucide.Circle className="size-2 fill-yellow-400 stroke-yellow-400" />
              <div className="flex flex-row items-center justify-center gap-0.5">
                <ClimateIcon className="size-4 text-white" />
                <span className="text-base font-medium text-white">
                  {destination.climate}
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

function Overview({
  destination,
  similarDestinations,
  topCities,
}: {
  destination: Destination;
  topCities: readonly City[];
  similarDestinations: readonly Destination[];
}) {
  const ClimateIcon = climateToIcon(destination.climate);

  return (
    <div className="flex flex-col gap-10 pb-4 xl:pb-0">
      <p className="px-4 text-base leading-[1.5] text-neutral-500">
        {destination.description}
      </p>

      <div className="flex flex-col gap-4 px-4">
        {/* <p className="text-lg font-medium text-neutral-600">Ratings</p> */}
        <section className="grid grid-cols-2 gap-x-8 gap-y-4 rounded-3xl border-0 border-primary bg-primary/5 p-5">
          {Object.entries(destination.ratings).map(([key, value]) => {
            const config: Record<
              string,
              { label: string; icon: React.ReactNode }
            > = {
              affordability: {
                label: "Cost",
                icon: <Lucide.Tag className="size-3.5 text-neutral-400" />,
              },
              healthcareQuality: {
                label: "Health",
                icon: (
                  <Lucide.HeartPulse className="size-3.5 text-neutral-400" />
                ),
              },
              personalSafety: {
                label: "Safety",
                icon: (
                  <Lucide.ShieldCheck className="size-3.5 text-neutral-400" />
                ),
              },
              politicalStability: {
                label: "Stability",
                icon: <Lucide.Globe className="size-3.5 text-neutral-400" />,
              },
              visaEase: {
                label: "Visa Ease",
                icon: <Lucide.FileText className="size-3.5 text-neutral-400" />,
              },
              taxEnvironment: {
                label: "Taxes",
                icon: (
                  <Lucide.HandCoins className="size-3.5 text-neutral-400" />
                ),
              },
              infrastructure: {
                label: "Infrastructure",
                icon: <Lucide.HardHat className="size-3.5 text-neutral-400" />,
              },
              weatherComfort: {
                label: "Weather",
                icon: <Lucide.CloudSun className="size-3.5 text-neutral-400" />,
              },
              healthcareCost: {
                label: "Health Cost",
                icon: (
                  <Lucide.CircleDollarSign className="size-3.5 text-neutral-400" />
                ),
              },
              economy: {
                label: "Economy",
                icon: (
                  <Lucide.TrendingUp className="size-3.5 text-neutral-400" />
                ),
              },
            };

            const item = config[key];
            if (!item) return null;

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-sm font-black ${gradeToColor(value.grade).text}`}
                >
                  {value.grade}
                </span>
              </div>
            );
          })}
        </section>
      </div>

      {(() => {
        const firstYoutubeResource = resources.find(
          (r) => r.destination === destination.id && r.platform === "YouTube",
        );
        if (!firstYoutubeResource) return null;

        const videoId = new URL(firstYoutubeResource.url).searchParams.get("v");
        if (!videoId) return null;

        return (
          <div className="px-4">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-100 shadow-sm">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={firstYoutubeResource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      })()}

      <div className="flex flex-col gap-4 px-4">
        <p className="text-lg font-medium text-neutral-600">Pros</p>
        <ul className="flex flex-col gap-2">
          {pros
            .filter((pro) => destination.pros.includes(pro.id))
            .map((pro) => {
              return (
                <React.Fragment key={pro.id}>
                  <li className="flex flex-row items-start gap-4 py-2">
                    <Lucide.Check className="size-5 text-green-600" />
                    <div className="flex flex-col gap-1">
                      <span className="grow text-base text-neutral-500 first-letter:uppercase">
                        {pro.name}
                      </span>
                      <span className="grow text-sm text-neutral-400 first-letter:uppercase">
                        {pro.description}
                      </span>
                    </div>
                  </li>
                  <div className="h-px bg-neutral-200" />
                </React.Fragment>
              );
            })}
        </ul>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <p className="text-lg font-medium text-neutral-600">Cons</p>
        <ul className="flex flex-col gap-2">
          {cons
            .filter((con) => destination.cons.includes(con.id))
            .map((con) => {
              return (
                <React.Fragment key={con.id}>
                  <li className="flex flex-row items-start gap-4 py-2">
                    <Lucide.X className="size-5 text-red-600" />
                    <div className="flex flex-col gap-1">
                      <span className="grow text-base text-neutral-500 first-letter:uppercase">
                        {con.name}
                      </span>
                      <span className="grow text-sm text-neutral-400 first-letter:uppercase">
                        {con.description}
                      </span>
                    </div>
                  </li>
                  <div className="h-px bg-neutral-200" />
                </React.Fragment>
              );
            })}
        </ul>
      </div>

      <div>
        <section className="flex flex-col gap-8 border-t border-b border-primary bg-bg px-4 py-8 xl:rounded-2xl xl:border">
          <header className="flex flex-col gap-2">
            <h3 className="flex flex-row items-center justify-center gap-2 text-center text-lg font-medium text-neutral-600">
              <Lucide.Calculator className="size-5 stroke-primary" />
              30-Year Retirement Cost Estimate
            </h3>
            <p className="text-center text-sm text-neutral-500">
              Total cost for retiring in {destination.name} over 30 years
            </p>
          </header>

          <div className="flex flex-col gap-2">
            <ul className="grid grid-cols-2 gap-2">
              <li className="text-center font-medium text-neutral-600">
                Single
              </li>
              <li className="text-center font-medium text-neutral-600">
                Couple
              </li>
            </ul>

            <ul className="grid grid-cols-2 gap-2">
              <Cost
                cost={destination.expenditure.single}
                inflationRate={destination.inflationRate}
              />
              <Cost
                cost={destination.expenditure.couple}
                inflationRate={destination.inflationRate}
              />
            </ul>
          </div>
        </section>

        {destination.internationalLiving && (
          <div className="flex flex-col items-center gap-4 bg-il-blue px-6 py-12 xl:hidden">
            <InternationalLivingLogo />
            <h3 className="text-center text-2xl leading-[1.5] font-semibold text-white capitalize">
              want more in-depth <br /> information on{" "}
              <span className="font-bold text-il-yellow">
                {destination.name}?
              </span>
            </h3>
            <p className="text-center text-white">
              Get detailed insights, expat stories, and on-the-ground reports
              from International Living
            </p>

            <div />

            <a
              target="blank"
              href={`https://internationalliving.com/countries/${destination.id}/`}
              className="rounded-lg bg-il-yellow px-4 py-3 text-sm font-semibold text-il-blue"
            >
              Visit International Living
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 px-4">
        <p className="text-lg font-medium text-neutral-600">
          Popular Retirement Cities
        </p>

        <ul className="flex flex-col gap-4">
          {topCities.map((city) => {
            return (
              <li className="" key={city.id}>
                <article className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4">
                  <h3 className="text-base font-medium text-neutral-600">
                    {city.name}
                  </h3>
                  <p className="text-sm text-neutral-500">{city.description}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {0 !== similarDestinations.length && (
        <div className="flex flex-col gap-6 px-4">
          <p className="text-lg font-medium text-neutral-600">
            Similar Destinations To Consider
          </p>

          <ul className="flex flex-col gap-2">
            {similarDestinations.map((destination) => {
              return (
                <li key={destination.id}>
                  <Wouter.Link href={`/${destination.id}/overview`}>
                    <article className="rounded-xl border border-neutral-100 bg-white">
                      <div className="relative h-40 rounded-xl bg-black">
                        <img
                          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                          className="absolute inset-0 h-full w-full rounded-xl object-cover"
                          alt={`scenic image of ${destination.name}`}
                        />

                        <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/0 from-10% to-black/75" />

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
                    </article>
                  </Wouter.Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Cost({ cost, inflationRate }: { cost: Cost; inflationRate: number }) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatterWithRounding = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingIncrement: 1000,
    roundingMode: "ceil",
  });

  function calculateTotalRetirementCost(
    annualCost: number,
    inflationRate: number,
    retirementDuration: number,
  ): number {
    return (
      annualCost *
      (((1 + inflationRate) ** retirementDuration - 1) / inflationRate)
    );
  }

  const currency = cost.currency;
  const monthly = cost.amount;
  const yearly = cost.amount * 12;
  const thirtyYear = cost.amount * 12 * 30;
  const thirtyYearWithInflation = calculateTotalRetirementCost(
    yearly,
    inflationRate,
    30,
  );

  return (
    <ul className="flex flex-col gap-2">
      <li>
        <article className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Monthly</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {currency}
            {formatter.format(monthly)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Yearly</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {currency}
            {formatter.format(yearly)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border border-primary bg-primary p-4">
          <h3 className="text-xs text-white">30 Years Without Inflation</h3>
          <p className="text-xl font-semibold text-white">
            {currency}
            {formatter.format(thirtyYear)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border border-primary bg-primary p-4">
          <h3 className="text-xs text-white">30 Years With Inflation</h3>
          <p className="text-xl font-semibold text-white">
            {currency}
            {formatterWithRounding.format(thirtyYearWithInflation)}
          </p>
        </article>
      </li>
    </ul>
  );
}

function Resources({ destination }: { destination: Destination }) {
  const [user, setUser] = useUser();
  const destinationResources = resources.filter(
    (r) => r.destination === destination.id,
  );

  return (
    <section className="flex flex-col gap-10 px-4 pb-4 xl:pb-0">
      {destinationResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Lucide.Library className="size-12 text-neutral-200" />
          <p className="text-lg font-medium text-neutral-400">
            No resources found for {destination.name}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {destinationResources.map((resource, index) => {
            const isSaved = UserUtils.isResourceSaved(user, resource.url);

            const toggleSave = (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              if (isSaved) {
                const savedItem = UserUtils.getSavedResource(user, resource.url);
                if (savedItem) {
                  setUser((prev) => UserUtils.removeSavedItem(prev, savedItem.id));
                }
              } else {
                setUser((prev) => UserUtils.saveResource(prev, resource));
              }
            };

            return (
              <li key={`${resource.url}-${index}`}>
                <article className="group flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-md">
                  <div className="flex items-center justify-between gap-4">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                        {resource.platform}
                      </span>
                      <Lucide.ExternalLink className="size-3 text-primary" />
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-neutral-50 active:scale-95"
                        aria-label="Share resource"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator.share({
                              title: resource.title,
                              url: resource.url,
                            });
                          } else {
                            navigator.clipboard.writeText(resource.url);
                          }
                        }}
                      >
                        <Lucide.Share2 className="size-4 text-neutral-400" />
                      </button>
                      <button
                        onClick={toggleSave}
                        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-neutral-50 active:scale-95"
                        aria-label={
                          isSaved ? "Remove from saved" : "Save resource"
                        }
                      >
                        <Lucide.Heart
                          className={`size-5 transition-colors ${
                            isSaved
                              ? "fill-red-500 stroke-red-500"
                              : "fill-none stroke-neutral-300"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-3"
                  >
                    <header className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-neutral-700 transition-colors group-hover:text-primary">
                          {resource.title}
                        </h3>

                        <p className="text-xs font-semibold text-neutral-500 capitalize">
                          {resource.author}
                        </p>
                      </div>
                    </header>

                    <p className="line-clamp-10 text-sm leading-relaxed text-neutral-500">
                      {resource.description}
                    </p>

                    <footer className="mt-2 flex-col items-start justify-between">
                      <div className="flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500 capitalize"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </footer>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

type RetirementEstimates = Readonly<
  Record<
    "single" | "couple",
    {
      withInflation: number;
      withoutInflation: number;
    }
  >
>;
function Calculator({ destination }: { destination: Destination }) {
  const [estimates, setEstimates] = React.useState<RetirementEstimates | null>(
    null,
  );

  function inflateAnnualCostToTargetRetirementYear(
    currentAnnualCost: number,
    inflationRate: number,
    yearsTillRetirement: number,
  ): number {
    return currentAnnualCost * (1 + inflationRate) ** yearsTillRetirement;
  }

  function calculateTotalRetirementCost(
    annualCost: number,
    inflationRate: number,
    retirementDuration: number,
  ): number {
    return (
      annualCost *
      (((1 + inflationRate) ** retirementDuration - 1) / inflationRate)
    );
  }

  return (
    <section className="xl-pb-0 xl-pb-0 flex flex-col gap-10 px-4 pb-4">
      <div className="flex flex-col gap-6 px-4">
        <p className="text-lg font-medium text-neutral-600">Details</p>
        <form
          onReset={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.setTimeout(() => {
              setEstimates(null);
            }, 400);
          }}
          onSubmit={(event) => {
            event.preventDefault();

            function parse() {
              const {
                inflationRate,
                currentAge,
                retirementAge,
                retirementDuration,
              } = Object.fromEntries(new FormData(event.currentTarget));
              return {
                inflationRate: parseInt(inflationRate as string) as number,
                currentAge: parseInt(currentAge as string) as number,
                retirementAge: parseInt(retirementAge as string) as number,
                retirementDuration: parseInt(
                  retirementDuration as string,
                ) as number,
              };
            }

            const {
              inflationRate,
              currentAge,
              retirementAge,
              retirementDuration,
            } = parse();

            function calculateSingleWithInflation() {
              const annualCostInRetirementYear =
                inflateAnnualCostToTargetRetirementYear(
                  destination.expenditure.single.amount * 12,
                  inflationRate / 100,
                  retirementAge - currentAge,
                );

              const totalRetirementCost = calculateTotalRetirementCost(
                annualCostInRetirementYear,
                inflationRate / 100,
                retirementDuration,
              );

              return totalRetirementCost;
            }

            function calculateCoupleWithInflation() {
              const annualCostInRetirementYear =
                inflateAnnualCostToTargetRetirementYear(
                  destination.expenditure.couple.amount * 12,
                  inflationRate / 100,
                  retirementAge - currentAge,
                );

              const totalRetirementCost = calculateTotalRetirementCost(
                annualCostInRetirementYear,
                inflationRate / 100,
                retirementDuration,
              );

              return totalRetirementCost;
            }

            const estimates: RetirementEstimates = {
              single: {
                withInflation: calculateSingleWithInflation(),
                withoutInflation:
                  destination.expenditure.single.amount *
                  12 *
                  retirementDuration,
              },
              couple: {
                withInflation: calculateCoupleWithInflation(),
                withoutInflation:
                  destination.expenditure.couple.amount *
                  12 *
                  retirementDuration,
              },
            };

            setEstimates(estimates);

            window.requestAnimationFrame(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            });
          }}
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="inflationRate"
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm text-neutral-400 capitalize">
              Inflation Rate (%)
            </span>
            <input
              className="w-12 rounded-xl border border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400 focus:border-primary"
              id="inflationRate"
              min={0}
              name="inflationRate"
              required
              type="number"
              step={0.1}
              placeholder="--"
              defaultValue={destination.inflationRate * 100}
            />
          </label>
          <div className="h-px bg-neutral-100" />
          <label
            htmlFor="currentAge"
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm text-neutral-400 capitalize">
              current age
            </span>
            <input
              className="w-12 rounded-xl border border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400 focus:border-primary"
              id="currentAge"
              min={0}
              name="currentAge"
              required
              type="number"
              placeholder="--"
            />
          </label>
          <div className="h-px bg-neutral-100" />

          <label
            htmlFor="retirementAge"
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm text-neutral-400 capitalize">
              retirement age
            </span>
            <input
              className="w-12 rounded-xl border border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400 focus:border-primary"
              id="retirementAge"
              min={0}
              name="retirementAge"
              required
              type="number"
              placeholder="--"
            />
          </label>
          <div className="h-px bg-neutral-100" />

          <label
            htmlFor="retirementDuration"
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm text-neutral-400 capitalize">
              retirement duration
            </span>
            <input
              className="w-12 rounded-xl border border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400 focus:border-primary"
              id="retirementDuration"
              min={0}
              name="retirementDuration"
              required
              type="number"
              placeholder="--"
            />
          </label>
          <div className="h-px bg-neutral-100" />

          <div />
          <div />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium whitespace-nowrap text-white capitalize md:w-min"
            >
              calculate my retirement costs
            </button>
            <button
              type="reset"
              className="text-sm text-accent capitalize md:-order-1"
            >
              reset
            </button>
          </div>
        </form>
      </div>

      {estimates && (
        <CalculatorResults estimates={estimates} destination={destination} />
      )}
    </section>
  );
}

function CalculatorResults({
  estimates,
  destination,
}: {
  estimates: RetirementEstimates;
  destination: Destination;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  const formatterWithRounding = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    roundingIncrement: 1000,
    roundingMode: "ceil",
  });

  return (
    <>
      <div className="flex flex-col gap-6 px-4">
        <p className="text-lg font-medium text-neutral-600">Single</p>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Monthly
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.currency}
                {formatter.format(destination.expenditure.single.amount)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Total Estimate
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.currency}
                {formatter.format(estimates.single.withoutInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Total Estimate &mdash; With inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.currency}
                {formatterWithRounding.format(estimates.single.withInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
        </ul>
      </div>

      <div className="flex flex-col gap-6 px-4">
        <p className="text-lg font-medium text-neutral-600">Couple</p>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Monthly
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.currency}
                {formatter.format(destination.expenditure.couple.amount)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Total Estimate
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.currency}
                {formatter.format(estimates.couple.withoutInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Total Estimate &mdash; With inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.currency}
                {formatterWithRounding.format(estimates.couple.withInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
        </ul>
      </div>
    </>
  );
}

function Providers({ destination }: { destination: Destination }) {
  const [user, setUser] = useUser();

  const destinationProviders = (providers as Provider[]).filter(
    (p) => p.destination === destination.id,
  );

  const categories = Array.from(
    new Set(destinationProviders.map((p) => p.category)),
  );

  return (
    <section className="flex flex-col gap-10 px-4 pb-4 xl:pb-0">
      {destinationProviders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Lucide.Building2 className="size-12 text-neutral-200" />
          <p className="text-lg font-medium text-neutral-400">
            No providers found for {destination.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {categories.map((category) => {
            const categoryInfo = (
              providerCategories as ProviderCategoryInfo[]
            ).find((c) => c.id === category);

            return (
              <div key={category} className="flex flex-col gap-6">
                <header className="flex flex-row items-center justify-between gap-2">
                  <h3 className="border-l-4 border-primary pl-4 text-xl font-semibold text-neutral-700">
                    {category}
                  </h3>
                  {categoryInfo && (
                    <Dialog.Root>
                      <Dialog.Trigger className="flex cursor-pointer items-center justify-center rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-primary">
                        <Lucide.Info className="size-5" />
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-all data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
                        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                          <Dialog.Title className="text-xl font-bold text-neutral-800">
                            {category}
                          </Dialog.Title>
                          <Dialog.Description className="mt-4 text-base leading-relaxed text-neutral-600">
                            {categoryInfo.description}
                          </Dialog.Description>
                          <div className="mt-8 flex justify-end">
                            <Dialog.Close className="cursor-pointer rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
                              Got it
                            </Dialog.Close>
                          </div>
                        </Dialog.Popup>
                      </Dialog.Portal>
                    </Dialog.Root>
                  )}
                </header>
                <ul className="flex flex-col gap-6">
                  {destinationProviders
                    .filter((p) => p.category === category)
                    .map((provider) => {
                      const isSaved = UserUtils.isProviderSaved(user, provider.id);

                      const toggleSave = () => {
                        if (isSaved) {
                          const savedItem = UserUtils.getSavedProvider(user, provider.id);
                          if (savedItem) {
                            setUser((prev) => UserUtils.removeSavedItem(prev, savedItem.id));
                          }
                        } else {
                          setUser((prev) => UserUtils.saveProvider(prev, provider));
                        }
                      };

                      return (
                        <li key={provider.id}>
                          <article className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:border-primary/20">
                            <div className="flex items-center justify-between gap-4">
                              <a
                                href={provider.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                              >
                                {new URL(provider.website).hostname}
                                <Lucide.ExternalLink className="size-3" />
                              </a>
                              <div className="flex items-center gap-2">
                                <button
                                  className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-neutral-50 active:scale-95"
                                  aria-label="Share provider"
                                  onClick={() => {
                                    if (navigator.share) {
                                      navigator.share({
                                        title: provider.name,
                                        url: provider.website,
                                      });
                                    } else {
                                      navigator.clipboard.writeText(
                                        provider.website,
                                      );
                                    }
                                  }}
                                >
                                  <Lucide.Share2 className="size-4 text-neutral-400" />
                                </button>
                                <button
                                  onClick={toggleSave}
                                  className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-neutral-50 active:scale-95"
                                  aria-label={
                                    isSaved ? "Remove from saved" : "Save provider"
                                  }
                                >
                                  <Lucide.Heart
                                    className={`size-5 transition-colors ${
                                      isSaved
                                        ? "fill-red-500 stroke-red-500"
                                        : "fill-none stroke-neutral-300"
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>

                            <header className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-lg font-bold text-neutral-800">
                                  {provider.name}
                                </h4>
                                {provider.partnered && (
                                  <Lucide.BadgeCheck className="size-5 fill-primary/10 text-primary" />
                                )}
                              </div>
                            </header>

                            <p className="text-sm leading-relaxed text-neutral-500">
                              {provider.description}
                            </p>

                            <footer className="mt-2 flex flex-col gap-2 border-t border-neutral-50 pt-4">
                              <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <Lucide.Phone className="size-3 shrink-0" />
                                <span>{provider.contact}</span>
                              </div>
                              {provider.address && (
                                <div className="flex items-start gap-2 text-xs text-neutral-400">
                                  <Lucide.MapPin className="mt-0.5 size-3 shrink-0" />
                                  <span>{provider.address}</span>
                                </div>
                              )}
                            </footer>
                          </article>
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
