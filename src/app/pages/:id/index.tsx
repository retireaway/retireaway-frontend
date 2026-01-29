import React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import cities from "@/data/cities.json" with { type: "json" };
import destinations from "@/data/destinations.json" with { type: "json" };

import { climateToIcon } from "@/utils/mappings";
import type { Cost, Destination } from "@/types/destination";
import type { City } from "@/types/city";
import { DestinationCard } from "@/components/destination-card";

import InternationalLivingLogo from "@/assets/svg/international-living-logo.svg?react";

export function DestinationProfile() {
  const { id, tab } = Wouter.useParams();

  if (id === undefined) {
    return (
      <section>
        <header>
          <h1>Missing Parameter ":id"</h1>
          <p>Expected paramter ":id" in url "/:id/:tab"</p>
        </header>
      </section>
    );
  }

  if (tab === undefined) {
    return (
      <section>
        <header>
          <h1>Missing Parameter ":id"</h1>
          <p>Expected paramter ":tab" in url "/:id/:tab"</p>
        </header>
      </section>
    );
  }

  const destination = destinations.find((d) => d.id === id);

  if (destination === undefined) {
    return (
      <section>
        <header>
          <h1>Destination Not Found</h1>
          <p>No destination with id {id}</p>
        </header>
      </section>
    );
  }

  const ClimateIcon = climateToIcon(destination.climate);
  const topCities: readonly City[] = cities.filter((city) =>
    destination.topCities.includes(city.id),
  );

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <section className="relative">
      <div className="relative h-72 bg-black">
        <img
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className="absolute inset-0 h-full w-full object-cover"
          alt={`scenic image of ${destination.name}`}
        />

        <div className="absolute inset-0 top-0 left-0 h-full w-full bg-linear-to-b from-black/0 from-30% to-black/75" />

        <button
          onClick={() => history.back()}
          className="absolute top-0 right-0 flex w-full items-center justify-start gap-2 p-4"
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

      <ul className="grid grid-cols-2 gap-4 border-b-1 border-neutral-100 bg-neutral-50/50 px-4 py-6">
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
              crowds
            </span>
            <span className="text-base font-semibold text-neutral-600">
              {destination.crowds}
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

      <ul className="flex border-b-1 border-neutral-100">
        <li className="grow p-4 text-center font-medium text-neutral-600">
          Overview
        </li>
        <li className="grow p-4 text-center font-normal text-neutral-400">
          Ratings
        </li>
      </ul>

      <Overview
        topCities={topCities}
        destination={destination}
        similarDestinations={destinations.filter((d) =>
          destination.similarDestinations.includes(d.id),
        )}
      />
    </section>
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
  return (
    <div className="flex flex-col gap-8 py-2">
      <p className="p-4 text-base leading-[1.5] text-neutral-500">
        {destination.description}
      </p>

      <div className="">
        <div className="flex flex-col gap-4 p-4">
          <p className="text-lg font-medium text-neutral-600">Pros</p>
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

        <div className="flex flex-col gap-4 p-4">
          <p className="text-lg font-medium text-neutral-600">Cons</p>
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
      </div>

      <section className="flex flex-col gap-8 border-t-1 border-b-1 border-neutral-100 bg-neutral-50/50 px-4 py-8">
        <header className="flex flex-col gap-2">
          <h3 className="text-center text-lg font-medium text-neutral-600">
            30-Year Retirement Cost Estimate
          </h3>
          <p className="text-center text-sm text-neutral-500">
            Total cost for retiring in {destination.name} over 30 years
          </p>
        </header>

        <div className="flex flex-col gap-2">
          <ul className="grid grid-cols-2 gap-2">
            <li className="text-center font-medium text-neutral-600">Single</li>
            <li className="text-center font-medium text-neutral-600">Couple</li>
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

      <div className="flex flex-col gap-6 p-4">
        <p className="text-lg font-medium text-neutral-600">
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

      {destination.internationalLiving && (
        <div className="flex flex-col items-center gap-4 bg-[#002c4e] px-6 py-12">
          <InternationalLivingLogo />
          <h3 className="text-center text-2xl leading-[1.5] font-semibold text-white capitalize">
            want more in-depth <br /> information on{" "}
            <span className="font-bold text-[#fbe232]">
              {destination.name}?
            </span>
          </h3>
          <p className="text-center text-white">
            Get detailed insights, expat stories, and on-the-ground reports from
            International Living
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

      {0 !== similarDestinations.length && (
        <div className="flex flex-col gap-6 p-4">
          <p className="text-lg font-medium text-neutral-600">
            Similar Destinations To Consider
          </p>

          <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
            {similarDestinations.map((destination) => {
              return (
                <li key={destination.id} className="w-90 snap-start">
                  <DestinationCard destination={destination} />
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
  });

  return (
    <ul className="flex flex-col gap-2">
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
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Monthly Cost</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {monthly.currency}
            {formatter.format(monthly.amount)}
          </p>
        </article>
      </li>
      <li>
        <article className="flex flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
          <h3 className="text-xs text-neutral-500">Yearly Cost</h3>
          <p className="text-xl font-semibold text-neutral-600">
            {monthly.currency}
            {formatter.format(monthly.amount * 12)}
          </p>
        </article>
      </li>
    </ul>
  );
}
