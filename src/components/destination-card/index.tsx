import React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import { climateToIcon, gradeToColor } from "@/utils/mappings";
import type { Destination } from "@/types/destination";
import { useComparison } from "@/contexts/comparison";
import { useUser } from "@/contexts/user";

import * as Icons from "@/assets/icons";

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
    <ul className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
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
  const { toggleDestination, isDestinationSelected } = useComparison();
  const { isDestinationSaved, saveDestination, removeSavedItem, profile } =
    useUser();

  const isSelected = isDestinationSelected(destination.id);
  const isSaved = isDestinationSaved(destination.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      const savedItem = profile.saved.find(
        (s) => s.type === "Destination" && s.data.id === destination.id,
      );
      if (savedItem) {
        removeSavedItem(savedItem.id);
      }
    } else {
      saveDestination(destination);
    }
  };

  const ClimateIcon = climateToIcon(destination.climate);

  return (
    <article
      className={`relative overflow-hidden rounded-xl border p-2 outline-2 transition-all hover:shadow-md ${
        isSelected
          ? "border-accent outline-accent"
          : "border-neutral-200 bg-white outline-transparent"
      }`}
    >
      <div className="relative h-64 overflow-hidden rounded-xl">
        <img
          loading="lazy"
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className={`absolute top-0 right-0 size-full object-cover object-center`}
          alt={`scenic image of ${destination.name}`}
        />
        <div className="absolute top-2 right-2 flex flex-row items-center justify-center gap-0.5">
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
              <Icons.Compare className="size-3.5 fill-neutral-700 stroke-neutral-700" />
              <span className="text-xs leading-none font-bold text-neutral-700">
                Compare
              </span>
            </button>
          )}

          <button
            onClick={toggleSave}
            className="flex size-8 items-center justify-center rounded-full border border-neutral-400 bg-white transition-all hover:bg-neutral-50 active:scale-95"
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
      </div>

      <header className="px-2 py-4">
        <div className="mb-1 flex flex-row items-center justify-between gap-2">
          <h2 className="text-2xl leading-none font-bold text-neutral-800">
            {destination.name}
          </h2>
        </div>

        <div className="mb-2 flex flex-row flex-wrap items-center justify-start gap-2">
          <div className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border-0 border-neutral-200 whitespace-nowrap">
            <Lucide.Globe className="size-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-800">
              {destination.region}
            </span>
          </div>

          <Lucide.CircleSmall className="size-2 text-neutral-700" />

          <div className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border-0 border-neutral-200 whitespace-nowrap">
            <ClimateIcon className="size-4 text-neutral-700" />
            <span className="text-sm font-semibold text-neutral-700">
              {destination.climate}
            </span>
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed font-normal text-neutral-600">
          {destination.description}
        </p>

        <div className="group/calculator relative mb-4 flex flex-col gap-3 rounded-xl border border-neutral-200 p-3 transition-all hover:border-primary/30 hover:bg-primary/5">
          <Wouter.Link
            href={`/${destination.id}/calculator`}
            className="absolute inset-0 z-10"
          />

          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-neutral-400">
                <Lucide.UserRound className="size-3.5" />
                <span className="text-[10px] font-bold tracking-wider uppercase">
                  Single
                </span>
              </div>
              <span className="text-lg font-bold text-neutral-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(destination.expenditure.single.amount)}
                <span className="text-xs font-medium text-neutral-400">
                  /mo
                </span>
              </span>
            </div>

            <div className="h-8 w-px bg-neutral-200" />

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-neutral-400">
                <Lucide.UsersRound className="size-3.5" />
                <span className="text-[10px] font-bold tracking-wider uppercase">
                  Couple
                </span>
              </div>
              <span className="text-lg font-bold text-neutral-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(destination.expenditure.couple.amount)}
                <span className="text-xs font-medium text-neutral-400">
                  /mo
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 border-t border-neutral-200/60 pt-2">
            <Lucide.Calculator className="size-3.5" />
            <span className="text-xs font-medium text-neutral-800">
              Find your retirement costs
            </span>
            <Lucide.MoveRight className="ml-auto size-4 opacity-100" />
          </div>
        </div>

        <div className="bg-neutral grid grid-cols-2 gap-x-8 gap-y-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          {Object.entries(destination.ratings).map(([key, value]) => {
            const _ = [
              "healthcareQuality",
              "personalSafety",
              "visaEase",
              "infrastructure",
              "politicalStability",
              "taxEnvironment",
            ];

            if (!_.includes(key)) {
              return undefined;
            }

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
                  <span className="text-xs font-semibold text-neutral-600">
                    {item.label}
                  </span>
                </div>
                <span
                  className={`text-sm font-black text-neutral-800! ${gradeToColor(value.grade).text}`}
                >
                  {value.grade}
                </span>
              </div>
            );
          })}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-1 p-2">
        <Wouter.Link href={`/${destination.id}/overview`}>
          <div className="flex items-center justify-center rounded-full bg-black p-3 text-sm font-semibold whitespace-nowrap text-white transition-all hover:bg-primary hover:shadow-lg active:scale-95">
            View Details
          </div>
        </Wouter.Link>
      </div>
    </article>
  );
}
