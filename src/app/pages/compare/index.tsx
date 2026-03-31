import React from "react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";

import { useComparison } from "@/contexts/comparison";
import type { Destination } from "@/types/destination";
import { gradeToColor } from "@/utils/mappings";

export function ComparisonPage() {
  const { selectedDestinations, toggleDestination } = useComparison();
  const [, setLocation] = Wouter.useLocation();
  const [activeMobileIndex, setActiveMobileIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  // Handle responsive layout state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ensure activeMobileIndex is within bounds if a destination is removed
  React.useEffect(() => {
    if (
      activeMobileIndex >= selectedDestinations.length &&
      selectedDestinations.length > 0
    ) {
      setActiveMobileIndex(selectedDestinations.length - 1);
    }
  }, [selectedDestinations.length, activeMobileIndex]);

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
    <div className="min-h-screen bg-neutral-50 pb-32 md:pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
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

      <main className="mx-auto max-w-7xl px-4 pt-8 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          {/* Header Section */}
          <div className="border-b border-neutral-100 p-8 pb-4">
            <div className="flex flex-col justify-end gap-1">
              <h2 className="text-3xl font-bold text-neutral-900">Compare</h2>
              <p className="text-sm font-medium text-neutral-500">
                Side-by-side analysis of your top choices.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* Grid Container */}
            <div
              className="grid min-w-full divide-y divide-neutral-100"
              style={{
                gridTemplateColumns: isMobile
                  ? "1fr 1fr"
                  : `minmax(180px, 1.2fr) repeat(${selectedDestinations.length}, minmax(240px, 1fr))`,
              }}
            >
              {/* Destination Images Row */}
              <div className="contents">
                <div className="hidden bg-white p-6 md:block" />
                {selectedDestinations.map((destination, index) => (
                  <div
                    key={destination.id}
                    className={`bg-white p-4 md:p-6 ${
                      index === activeMobileIndex ? "block" : "hidden md:block"
                    } ${isMobile ? "col-span-2" : "col-span-1"}`}
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Sections */}
              {comparisonSections.map((section) => (
                <React.Fragment key={section.title}>
                  {/* Section Title Row */}
                  <div
                    className="bg-neutral-50/50 px-6 py-4"
                    style={{
                      gridColumn: `1 / span ${isMobile ? 2 : selectedDestinations.length + 1}`,
                    }}
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                      {section.icon}
                      {section.title}
                    </div>
                  </div>

                  {/* Metric Rows */}
                  {section.metrics.map((metric) => (
                    <div key={metric.label} className="group contents">
                      <div className="flex items-center px-4 py-4 text-sm font-medium text-neutral-500 transition-colors group-hover:bg-neutral-50/30 md:px-6 md:py-5">
                        {metric.label}
                      </div>
                      {selectedDestinations.map((destination, index) => (
                        <div
                          key={`${destination.id}-${metric.label}`}
                          className={`flex items-center px-4 py-4 text-sm text-neutral-900 transition-colors group-hover:bg-neutral-50/30 md:px-6 md:py-5 ${
                            index === activeMobileIndex
                              ? "block"
                              : "hidden md:block"
                          }`}
                        >
                          {metric.getValue(destination)}
                        </div>
                      ))}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 md:hidden">
        <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white/90 p-2 shadow-2xl backdrop-blur-md">
          {selectedDestinations.map((destination, index) => (
            <button
              key={destination.id}
              onClick={() => setActiveMobileIndex(index)}
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl py-2 transition-all ${
                index === activeMobileIndex
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              <span className="px-2 text-xs font-bold whitespace-nowrap">
                {destination.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
