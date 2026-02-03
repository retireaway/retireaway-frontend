import * as Wouter from "wouter";
import React from "react";
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
  return (
    <ul className="mx-auto grid max-w-300 grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
  });

  const [imageStatus, setImageStatus] = React.useState<boolean>(false);

  return (
    <article className="max-w-120 rounded-2xl border-1 border-neutral-100 bg-white">
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

      <div className="flex flex-col gap-4">
        <div className="h-px bg-neutral-100" />

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

        <div className="h-px bg-neutral-100" />

        <div className="grid grid-cols-2 rounded-xl px-4">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs font-medium text-neutral-400 uppercase">
              single
            </span>
            <span className="text-2xl font-bold text-neutral-600 uppercase">
              {destination.expenditure.single.monthly.currency}
              {formatter.format(destination.expenditure.single.monthly.amount)}
            </span>
            <span className="text-xs font-normal text-neutral-400">/month</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="text-xs font-medium text-neutral-400 uppercase">
              couple
            </span>
            <span className="text-2xl font-bold text-neutral-600 uppercase">
              {destination.expenditure.couple.monthly.currency}
              {formatter.format(destination.expenditure.couple.monthly.amount)}
            </span>
            <span className="text-xs font-normal text-neutral-400">/month</span>
          </div>
        </div>

        <div className="h-px bg-neutral-100" />

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

        <div className="h-px bg-neutral-100" />

        <div className="flex flex-row gap-2 px-4">
          <Wouter.Link
            href={`/${destination.id}/overview`}
            className="basis-1/2 rounded-lg border-1 border-neutral-600 bg-neutral-600 py-2 text-center text-sm font-medium text-neutral-100"
          >
            View Details
          </Wouter.Link>
          <Wouter.Link
            href={`/${destination.id}/calculator`}
            className="basis-1/2 rounded-lg border-2 border-neutral-600 bg-white py-2 text-center text-sm font-medium text-neutral-600"
          >
            Calculator
          </Wouter.Link>
        </div>

        <div />
      </div>
    </article>
  );
}
