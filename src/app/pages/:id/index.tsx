import React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import cities from "@/data/cities.json" with { type: "json" };
import destinations from "@/data/destinations.json" with { type: "json" };

import { climateToIcon } from "@/utils/mappings";
import type { Cost, Destination } from "@/types/destination";
import type { City } from "@/types/city";

import InternationalLivingLogo from "@/assets/svg/international-living-logo.svg?react";

type Tab = "overview" | "ratings" | "calculator";

function isTab(value: unknown): value is Tab {
  const isOverview = value === "overview";
  const isRatings = value === "ratings";
  const isCalculator = value === "calculator";
  return isOverview || isRatings || isCalculator;
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
          <p>Must be one of "overview", "ratings"</p>
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
    <section className="relative m-auto flex min-h-svh max-w-[1700px] flex-col xl:flex-row xl:gap-4">
      <div className="flex basis-3/5 flex-col xl:sticky xl:top-0 xl:left-0 xl:h-svh xl:gap-4 xl:p-8 xl:pr-0">
        <Hero destination={destination} />
        <ul className="grid grid-cols-2 gap-4 border-b-1 border-neutral-100 bg-neutral-50/50 px-4 py-6 xl:grid-cols-4 xl:rounded-xl xl:border-1">
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
          {/* <li className="xl:hidden"> */}
          {/*   <div className="flex flex-col items-center justify-center gap-1 rounded-xl"> */}
          {/*     <span className="text-xs font-medium text-neutral-400 capitalize"> */}
          {/*       crowds */}
          {/*     </span> */}
          {/*     <span className="text-base font-semibold text-neutral-600"> */}
          {/*       {destination.crowds} */}
          {/*     </span> */}
          {/*   </div> */}
          {/* </li> */}
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
        <ul className="grid grid-cols-3 border-b-1 border-neutral-100">
          <li className="flex grow justify-center">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/overview`}
              className={`p-4 text-center ${params["tab"] === "overview" ? "font-medium text-neutral-600" : "text-neutral-400"} `}
            >
              Overview
            </Wouter.Link>
          </li>
          <li className="flex grow justify-center">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/ratings`}
              className={`p-4 text-center ${params["tab"] === "ratings" ? "font-medium text-neutral-600" : "text-neutral-400"} `}
            >
              Ratings
            </Wouter.Link>
          </li>
          <li className="flex grow justify-center">
            <Wouter.Link
              replace={true}
              href={`/${destination.id}/calculator`}
              className={`p-4 text-center ${params["tab"] === "calculator" ? "font-medium text-neutral-600" : "text-neutral-400"} `}
            >
              Calculator
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

        {params["tab"] === "ratings" && <Ratings destination={destination} />}
        {params["tab"] === "calculator" && (
          <Calculator destination={destination} />
        )}
      </div>
    </section>
  );
}

function Hero({ destination }: { destination: Destination }) {
  const ClimateIcon = climateToIcon(destination.climate);

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
        className="absolute top-0 left-0 flex w-min items-center justify-start gap-2 p-4"
      >
        <Lucide.ArrowLeft className="size-6 text-white" />
      </button>

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
        <p className="text-xl font-medium text-neutral-600">Pros</p>
        <ul className="flex flex-col gap-2">
          {destination.pros.map((pro) => {
            return (
              <React.Fragment key={pro}>
                <li className="flex flex-row items-center gap-4 py-2">
                  <Lucide.Check className="size-5 text-green-600" />
                  <span className="grow text-base text-neutral-500 first-letter:uppercase">
                    {pro}
                  </span>
                </li>
                <div className="h-px bg-neutral-100" />
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <p className="text-xl font-medium text-neutral-600">Cons</p>
        <ul className="flex flex-col gap-2">
          {destination.cons.map((con) => {
            return (
              <React.Fragment key={con}>
                <li className="flex flex-row items-center gap-4 py-2">
                  <Lucide.X className="size-5 text-red-500" />
                  <span className="grow text-base text-neutral-500 first-letter:uppercase">
                    {con}
                  </span>
                </li>
                <div className="h-px bg-neutral-100" />
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <div>
        <section className="flex flex-col gap-8 border-t-1 border-b-1 border-neutral-100 bg-neutral-50/50 px-4 py-8">
          <header className="flex flex-col gap-2">
            <h3 className="text-center text-xl font-medium text-neutral-600">
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
                monthly={destination.expenditure.single.monthly}
                thirtyYearWithInflation={
                  destination.expenditure.single.thirtyYearWithInflation
                }
              />
              <Cost
                monthly={destination.expenditure.couple.monthly}
                thirtyYearWithInflation={
                  destination.expenditure.couple.thirtyYearWithInflation
                }
              />
            </ul>
          </div>
        </section>

        {destination.internationalLiving && (
          <div className="flex flex-col items-center gap-4 bg-[#002c4e] px-6 py-12 xl:hidden">
            <InternationalLivingLogo />
            <h3 className="text-center text-2xl leading-[1.5] font-semibold text-white capitalize">
              want more in-depth <br /> information on{" "}
              <span className="font-bold text-[#fbe232]">
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
              className="rounded-lg bg-[#fbe232] px-4 py-3 text-sm font-semibold text-[#002c4e]"
            >
              Visit International Living
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 px-4">
        <p className="text-xl font-medium text-neutral-600">
          Popular Retirement Cities
        </p>

        <ul className="flex flex-col gap-4">
          {topCities.map((city) => {
            return (
              <li className="" key={city.id}>
                <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 p-4">
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
          <p className="text-xl font-medium text-neutral-600">
            Similar Destinations To Consider
          </p>

          <ul className="flex flex-col gap-2">
            {similarDestinations.map((destination) => {
              return (
                <li key={destination.id}>
                  <Wouter.Link href={`/${destination.id}/overview`}>
                    <article className="rounded-xl border-1 border-neutral-100 bg-white">
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

function Cost({
  monthly,
  thirtyYearWithInflation,
}: {
  monthly: Cost;
  thirtyYearWithInflation: Cost;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    roundingIncrement: 1000,
    roundingMode: "ceil",
  });

  return (
    <ul className="flex flex-col gap-2">
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Monthly</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {monthly.currency}
            {formatter.format(monthly.amount)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Yearly</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {monthly.currency}
            {formatter.format(monthly.amount * 12)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">
            30 Years Without Inflation
          </h3>
          <p className="text-xl font-semibold text-neutral-600">
            {monthly.currency}
            {formatter.format(monthly.amount * 12 * 30)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">30 Years With Inflation</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {thirtyYearWithInflation.currency}
            {formatter.format(thirtyYearWithInflation.amount)}
          </p>
        </article>
      </li>
    </ul>
  );
}

function Ratings({ destination }: { destination: Destination }) {
  const _ = Object.entries(destination.ratings);

  const __: Record<string, string> = {
    affordability: "Affordability",
    healthcareQuality: "Healthcare",
    personalSafety: "Personal Safety",
    politicalStability: "Political Stability",
    visaEase: "Visa Ease",
    taxEnvironment: "Tax Environment",
    infrastructure: "Infrastructure",
    weatherComfort: "Weather Comfort",
    healthcareCost: "Healthcare Cost",
    economy: "Economy",
  };

  return (
    <section className="xl-pb-0 xl-pb-0 flex flex-col gap-10 px-4 pb-4">
      <div className="flex flex-col gap-4 px-4">
        <p className="text-xl font-medium text-neutral-600">
          Core Quality Factors
        </p>

        <ul className="flex flex-col gap-2">
          {_.map(([key, value]) => {
            if (key === "visaEase" || key === "taxEnvironment") return;

            return (
              <React.Fragment key={key}>
                <li className="flex flex-row items-end gap-2 py-2">
                  <div className="flex grow flex-col items-start justify-between">
                    <span className="grow text-sm font-normal text-neutral-400">
                      {__[key]}
                    </span>
                    <span className="text-lg font-medium text-neutral-600">
                      {value.label}
                    </span>
                  </div>

                  <span className="text-lg font-semibold text-neutral-600">
                    {value.grade}
                  </span>
                </li>
                <div className="h-px bg-neutral-100" />
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <p className="text-xl font-medium text-neutral-600">
          Practical Considerations
        </p>

        <ul className="flex flex-col gap-2">
          {_.map(([key, value]) => {
            if (!(key === "visaEase" || key === "taxEnvironment")) return;

            return (
              <React.Fragment key={key}>
                <li className="flex flex-col gap-2 py-2">
                  <span className="grow text-sm font-normal text-neutral-400">
                    {__[key]}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-neutral-600">
                      {value.label}
                    </span>
                    <span className="text-lg font-bold text-neutral-600">
                      {value.grade}
                    </span>
                  </div>
                </li>
                <div className="h-px bg-neutral-100" />
              </React.Fragment>
            );
          })}
        </ul>
      </div>
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
        <p className="text-base font-medium text-neutral-600">Details</p>
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
              const { currentAge, retirementAge, retirementDuration } =
                Object.fromEntries(new FormData(event.currentTarget));
              return {
                currentAge: parseInt(currentAge as string) as number,
                retirementAge: parseInt(retirementAge as string) as number,
                retirementDuration: parseInt(
                  retirementDuration as string,
                ) as number,
              };
            }

            const { currentAge, retirementAge, retirementDuration } = parse();

            function calculateSingleWithInflation() {
              const annualCostInRetirementYear =
                inflateAnnualCostToTargetRetirementYear(
                  destination.expenditure.single.monthly.amount * 12,
                  destination.inflation,
                  retirementAge - currentAge,
                );

              const totalRetirementCost = calculateTotalRetirementCost(
                annualCostInRetirementYear,
                destination.inflation,
                retirementDuration,
              );

              return totalRetirementCost;
            }

            function calculateCoupleWithInflation() {
              const annualCostInRetirementYear =
                inflateAnnualCostToTargetRetirementYear(
                  destination.expenditure.couple.monthly.amount * 12,
                  destination.inflation,
                  retirementAge - currentAge,
                );

              const totalRetirementCost = calculateTotalRetirementCost(
                annualCostInRetirementYear,
                destination.inflation,
                retirementDuration,
              );

              return totalRetirementCost;
            }

            const estimates: RetirementEstimates = {
              single: {
                withInflation: calculateSingleWithInflation(),
                withoutInflation:
                  destination.expenditure.single.monthly.amount *
                  12 *
                  retirementDuration,
              },
              couple: {
                withInflation: calculateCoupleWithInflation(),
                withoutInflation:
                  destination.expenditure.couple.monthly.amount *
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
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-sm text-neutral-400 capitalize">
              Inflation rate
            </span>
            <span className="font-semibold text-neutral-600">
              {new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              }).format(destination.inflation * 100)}
              %
            </span>
          </div>
          <div className="h-px bg-neutral-100" />
          <label
            htmlFor="currentAge"
            className="flex items-center justify-between gap-2"
          >
            <span className="text-sm text-neutral-400 capitalize">
              current age
            </span>
            <input
              className="w-12 rounded-xl border-1 border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400"
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
              className="w-12 rounded-xl border-1 border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400"
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
              className="w-12 rounded-xl border-1 border-neutral-100 p-2 text-center text-base font-semibold text-neutral-600 outline-none placeholder:font-normal placeholder:text-neutral-400 user-invalid:border-red-400"
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

          <div className="flex items-center justify-between">
            <button
              type="reset"
              className="text-sm text-neutral-400 capitalize"
            >
              reset
            </button>
            <button
              type="submit"
              className="text-sm font-medium text-neutral-600 capitalize underline"
            >
              calculate retirement costs
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
    roundingIncrement: 1000,
    roundingMode: "ceil",
  });

  return (
    <>
      <div className="flex flex-col gap-6 px-4">
        <p className="text-base font-medium text-neutral-600">Single</p>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Monthly Cost
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.monthly.currency}
                {formatter.format(
                  destination.expenditure.single.monthly.amount,
                )}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                With inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.monthly.currency}
                {formatter.format(estimates.single.withInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Without inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.single.monthly.currency}
                {formatter.format(estimates.single.withoutInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
        </ul>
      </div>

      <div className="flex flex-col gap-6 px-4">
        <p className="text-base font-medium text-neutral-600">Couple</p>
        <ul className="flex flex-col gap-4">
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Monthly Cost
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.monthly.currency}
                {formatter.format(
                  destination.expenditure.couple.monthly.amount,
                )}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                With inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.monthly.currency}
                {formatter.format(estimates.couple.withInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
          <li>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-neutral-400 capitalize">
                Without inflation
              </span>
              <span className="font-semibold text-neutral-600">
                {destination.expenditure.couple.monthly.currency}
                {formatter.format(estimates.couple.withoutInflation)}
              </span>
            </div>
          </li>
          <div className="h-px bg-neutral-100" />
        </ul>
      </div>
    </>
  );
}
