import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import { Rating } from "@/components/rating";
import { climateToIcon } from "@/utils/mappings";
import type { Destination } from "@/types/destination";
import { Chip } from "@/components/chip";

export function DestinationCardList({
  destinations,
}: {
  destinations: readonly Destination[];
}) {
  if (destinations.length === 0) {
    return (
      <div className="mx flex h-100 flex-col items-center justify-center gap-2">
        <Lucide.GlobeX className="size-10 stroke-neutral-400" />
        <span className="text-base font-normal text-neutral-400 capitalize">
          no matching destinations
        </span>
      </div>
    );
  }
  return (
    <ul className="mx-auto grid w-full max-w-300 grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
      {destinations.map((country) => {
        return (
          <li key={country.id}>
            <DestinationCard destination={country} />
          </li>
        );
      })}
    </ul>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  const ClimateIcon = climateToIcon(destination.climate);

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  });

  return (
    <article className="max-w-120 rounded-2xl border-1 border-neutral-200 bg-white">
      <div className="relative h-56 rounded-t-2xl bg-black">
        <img
          loading="lazy"
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className={`absolute inset-0 h-full w-full rounded-t-2xl object-cover`}
          alt={`scenic image of ${destination.name}`}
        />

        <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/0 from-30% to-black/60" />

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
                <Lucide.Circle className="size-1.5 fill-accent stroke-accent" />
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

      <div className="flex flex-col gap-4">
        <div className="h-px bg-neutral-200" />

        <div className="grid grid-cols-4 gap-2 px-4">
          <Rating
            text="Health"
            grade={destination.ratings.healthcareQuality.grade}
          />
          <Rating
            text="Safety"
            grade={destination.ratings.personalSafety.grade}
          />
          <Rating text="Cost" grade={destination.ratings.affordability.grade} />
          <Rating text="Visa" grade={destination.ratings.visaEase.grade} />
        </div>

        <div className="h-px bg-neutral-200" />

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-sm font-medium text-neutral-400 capitalize">
              living cost range
            </span>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-3xl font-bold text-neutral-600 uppercase">
                {formatter.formatRange(
                  destination.expenditure.single.amount,
                  destination.expenditure.couple.amount,
                )}
              </span>
              {/* <span className="text-3xl font-bold text-neutral-600 uppercase"> */}
              {/*   {destination.expenditure.single.currency} */}
              {/*   {formatter.format(destination.expenditure.single.amount)} */}
              {/* </span> */}
              {/* <span className="text-3xl font-bold text-neutral-600"> */}
              {/*   &mdash; */}
              {/* </span> */}
              {/* <span className="text-3xl font-bold text-neutral-600 uppercase"> */}
              {/*   {destination.expenditure.single.currency} */}
              {/*   {formatter.format(destination.expenditure.couple.amount)} */}
              {/* </span> */}
            </div>
            <span className="text-sm font-normal text-neutral-400">/month</span>
          </div>
          {/* <div className="flex flex-col items-center justify-center gap-0.5"> */}
          {/*   <span className="text-xs font-medium text-neutral-400 uppercase"> */}
          {/*     couple */}
          {/*   </span> */}
          {/*   <span className="text-2xl font-bold text-neutral-600 uppercase"> */}
          {/*     {destination.expenditure.couple.currency} */}
          {/*     {formatter.format(destination.expenditure.couple.amount)} */}
          {/*   </span> */}
          {/*   <span className="text-xs font-normal text-neutral-400">/month</span> */}
          {/* </div> */}
        </div>

        <div className="h-px bg-neutral-200" />

        <div className="px-4">
          <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
            {destination.tags.map((region) => {
              return (
                <li key={region} className="snap-start">
                  <Chip color="neutral" fill="light" size="xs">
                    {region}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="h-px bg-neutral-200" />

        <div className="flex flex-row gap-2 px-4">
          <Wouter.Link
            href={`/${destination.id}/overview`}
            className="basis-1/2 rounded-lg border-1 border-primary bg-primary py-2 text-center text-sm font-medium text-neutral-50"
          >
            View Details
          </Wouter.Link>
          <Wouter.Link
            href={`/${destination.id}/calculator`}
            className="basis-1/2 rounded-lg border-2 border-primary bg-white py-2 text-center text-sm font-medium text-primary"
          >
            Calculator
          </Wouter.Link>
        </div>

        <div />
      </div>
    </article>
  );
}
