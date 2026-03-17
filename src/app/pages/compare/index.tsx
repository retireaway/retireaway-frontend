import React from "react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";

import { useComparison } from "@/contexts/comparison";
import type { Destination } from "@/types/destination";
import { climateToIcon, gradeToColor } from "@/utils/mappings";

export function ComparisonPage() {
  const { selectedDestinations, toggleDestination } = useComparison();
  const [, setLocation] = Wouter.useLocation();

  if (selectedDestinations.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-50 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
          <Lucide.LayoutGrid className="size-10" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">
            No destinations selected
          </h1>
          <p className="mt-2 text-neutral-500">
            Select at least two destinations to start comparing them.
          </p>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800"
        >
          Browse Destinations
        </button>
      </div>
    );
  }

  const renderGrade = (grade: string) => (
    <span
      className={`inline-flex items-center gap-1.5 font-bold ${gradeToColor(grade).text}`}
    >
      {grade}
    </span>
  );

  const comparisonSections = [
    {
      title: "Financials",
      icon: <Lucide.CircleDollarSign className="size-5" />,
      metrics: [
        {
          label: "Monthly Cost (Single)",
          getValue: (d: Destination) =>
            `${d.expenditure.single.currency} ${d.expenditure.single.amount.toLocaleString()}`,
        },
        {
          label: "Monthly Cost (Couple)",
          getValue: (d: Destination) =>
            `${d.expenditure.couple.currency} ${d.expenditure.couple.amount.toLocaleString()}`,
        },
        {
          label: "Affordability",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.affordability.grade),
        },
        {
          label: "Tax Environment",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.taxEnvironment.grade),
        },
        {
          label: "Economy",
          getValue: (d: Destination) => renderGrade(d.ratings.economy.grade),
        },
        {
          label: "Inflation Rate",
          getValue: (d: Destination) =>
            `${(d.inflationRate * 100).toFixed(1)}%`,
        },
      ],
    },
    {
      title: "Quality of Life",
      icon: <Lucide.HeartPulse className="size-5" />,
      metrics: [
        {
          label: "Healthcare Quality",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.healthcareQuality.grade),
        },
        {
          label: "Healthcare Cost",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.healthcareCost.grade),
        },
        {
          label: "Personal Safety",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.personalSafety.grade),
        },
        {
          label: "Political Stability",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.politicalStability.grade),
        },
        {
          label: "Infrastructure",
          getValue: (d: Destination) =>
            renderGrade(d.ratings.infrastructure.grade),
        },
      ],
    },
    {
      title: "Lifestyle & Environment",
      icon: <Lucide.Palmtree className="size-5" />,
      metrics: [
        { label: "Climate", getValue: (d: Destination) => d.climate },
        {
          label: "English Usage",
          getValue: (d: Destination) => d.englishUsage,
        },
        { label: "Crowds", getValue: (d: Destination) => d.crowds },
        {
          label: "Retirement Community",
          getValue: (d: Destination) => d.retirementCommunity,
        },
      ],
    },
    {
      title: "Health & Demographics",
      icon: <Lucide.Users className="size-5" />,
      metrics: [
        {
          label: "Life Expectancy",
          getValue: (d: Destination) => `${d.lifeExpectancy} years`,
        },
        {
          label: "Life Expectancy (65+)",
          getValue: (d: Destination) => `${d.lifeExpectancyAfter65} years`,
        },
        {
          label: "Population Density",
          getValue: (d: Destination) => d.populationDensity,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLocation("/")}
                className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900"
              >
                <Lucide.ArrowLeft className="size-4" />
                Back
              </button>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="text-sm font-medium text-neutral-500">
                {selectedDestinations.length} Destinations Selected
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr>
                  <th
                    colSpan={selectedDestinations.length + 1}
                    className="border-b border-neutral-100 p-8 pb-4"
                  >
                    <div className="flex flex-col justify-end gap-1">
                      <h2 className="text-3xl font-bold text-neutral-900">
                        Compare
                      </h2>
                      <p className="text-sm font-medium text-neutral-500">
                        Side-by-side analysis of your top choices.
                      </p>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="w-80 border-b border-neutral-100 p-6"></th>
                  {selectedDestinations.map((destination) => {
                    const ClimateIcon = climateToIcon(destination.climate);
                    return (
                      <th
                        key={destination.id}
                        className="min-w-70 border-b border-neutral-100 p-6"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                          <img
                            src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                            alt={destination.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-b from-black/0 from-30% to-black/60" />

                          <button
                            onClick={() => toggleDestination(destination)}
                            className="absolute top-2 right-2 rounded-full bg-accent p-1.5 text-white shadow-sm transition-all hover:bg-black/40"
                          >
                            <Lucide.Trash2 className="size-4" />
                          </button>

                          <div className="absolute bottom-0 w-full p-4 text-left">
                            <h3 className="text-xl font-bold text-white">
                              {destination.name}
                            </h3>
                            <div className="mt-1 flex flex-row items-center justify-start gap-2">
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
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Metrics
                  </td>
                  <td
                    colSpan={selectedDestinations.length}
                    className="px-6 py-4"
                  />
                </tr>
                {comparisonSections.map((section) => (
                  <React.Fragment key={section.title}>
                    <tr className="bg-neutral-50/50">
                      <td
                        colSpan={selectedDestinations.length + 1}
                        className="px-6 py-4"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                          {section.icon}
                          {section.title}
                        </div>
                      </td>
                    </tr>
                    {section.metrics.map((metric) => (
                      <tr
                        key={metric.label}
                        className="group transition-colors hover:bg-neutral-50/30"
                      >
                        <td className="px-6 py-5 text-sm font-medium text-neutral-500">
                          {metric.label}
                        </td>
                        {selectedDestinations.map((destination) => (
                          <td
                            key={`${destination.id}-${metric.label}`}
                            className="px-6 py-5 text-sm text-neutral-900"
                          >
                            {metric.getValue(destination)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
