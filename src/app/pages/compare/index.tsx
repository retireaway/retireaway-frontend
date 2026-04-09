import React from "react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";

import { useComparison } from "@/contexts/comparison";
import type { Destination } from "@/types/destination";
import { gradeToColor } from "@/utils/mappings";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

function calculateTotalRetirementCost(
  annualCost: number,
  inflationRate: number,
  retirementDuration: number,
): number {
  if (inflationRate === 0) return annualCost * retirementDuration;
  return (
    annualCost *
    (((1 + inflationRate) ** retirementDuration - 1) / inflationRate)
  );
}

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export function ComparisonPage() {
  const { selectedDestinations, toggleDestination } = useComparison();
  const [activeMobileIndex, setActiveMobileIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  const showAddPlaceholder = selectedDestinations.length < 2;

  // Handle responsive layout state
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ensure activeMobileIndex is within bounds if a destination is removed
  React.useEffect(() => {
    const maxIndex = showAddPlaceholder
      ? selectedDestinations.length
      : selectedDestinations.length - 1;

    if (activeMobileIndex > maxIndex && selectedDestinations.length > 0) {
      setActiveMobileIndex(Math.max(0, maxIndex));
    }
  }, [selectedDestinations.length, activeMobileIndex, showAddPlaceholder]);

  if (selectedDestinations.length === 0) {
    return (
      <div className="flex min-h-svh flex-col bg-white">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-50 text-neutral-300">
            <Lucide.LayoutGrid className="size-12" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              No destinations selected
            </h1>
            <p className="mt-3 text-lg font-medium text-neutral-500">
              Select at least two destinations to start comparing them.
            </p>
          </div>
          <Wouter.Link href="/explore">
            <div className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95">
              Browse Destinations
            </div>
          </Wouter.Link>
        </main>
        <Footer />
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
          label: "Retirement Calculator",
          getValue: (d: Destination) => (
            <Wouter.Link
              href={`/${d.id}/calculator`}
              className="font-medium text-primary underline transition-colors hover:text-primary/80"
            >
              View {d.name} Calculator
            </Wouter.Link>
          ),
        },
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
    <div className="flex min-h-svh flex-col bg-white text-neutral-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-6 lg:px-8 lg:py-24">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            Compare <span className="text-primary">Destinations</span>
          </h1>
          {/* <p className="max-w-2xl text-lg font-medium text-neutral-500"> */}
          {/*   A side-by-side analysis of your top choices to help you make the */}
          {/*   best decision for your next chapter. */}
          {/* </p> */}
        </header>

        {/* Compact Summary Overview */}
        <section className="mb-12 overflow-hidden rounded-4xl border border-neutral-100 bg-neutral-50/30 p-4 md:p-6">
          <div
            className="grid items-center gap-x-2 gap-y-4 md:gap-x-6"
            style={{
              gridTemplateColumns: `minmax(100px, 1.5fr) repeat(${selectedDestinations.length}, 1fr)`,
            }}
          >
            {/* Header Row */}
            <div className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              Overview
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className="truncate text-center text-xs font-black text-neutral-900 uppercase md:text-sm"
              >
                {d.name}
              </div>
            ))}

            <div className="col-span-full h-px bg-neutral-100" />

            {/* Monthly (S/C) Row */}
            <div className="flex items-center gap-2">
              <Lucide.Wallet className="size-3 text-neutral-400" />
              <div className="flex flex-col">
                <span className="text-[10px] leading-none font-bold text-neutral-500 uppercase">
                  Monthly
                </span>
                <span className="text-[8px] leading-none font-medium text-neutral-400 uppercase">
                  Single / Couple
                </span>
              </div>
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className="text-center text-xs font-bold text-neutral-700 md:text-sm"
              >
                {d.expenditure.single.currency}
                {compactFormatter
                  .format(d.expenditure.single.amount)
                  .toLowerCase()}{" "}
                /{" "}
                {compactFormatter
                  .format(d.expenditure.couple.amount)
                  .toLowerCase()}
              </div>
            ))}

            {/* 30yr Est. (S/C) Row */}
            <div className="flex items-center gap-2">
              <Lucide.TrendingUp className="size-3 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] leading-none font-bold text-primary uppercase">
                  30yr Est.
                </span>
                <span className="text-[8px] leading-none font-medium text-primary/60 uppercase">
                  Single / Couple
                </span>
              </div>
            </div>
            {selectedDestinations.map((d) => {
              const s = calculateTotalRetirementCost(
                d.expenditure.single.amount * 12,
                d.inflationRate,
                30,
              );
              const c = calculateTotalRetirementCost(
                d.expenditure.couple.amount * 12,
                d.inflationRate,
                30,
              );
              return (
                <div
                  key={d.id}
                  className="text-center text-xs font-extrabold text-primary md:text-sm"
                >
                  {d.expenditure.single.currency}
                  {compactFormatter.format(s)} / {compactFormatter.format(c)}
                </div>
              );
            })}

            <div className="col-span-full h-px bg-neutral-100" />

            {/* Health Row */}
            <div className="flex items-center gap-2">
              <Lucide.HeartPulse className="size-3 text-neutral-400" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase">
                Health
              </span>
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className={`text-center text-sm font-bold ${gradeToColor(d.ratings.healthcareQuality.grade).text}`}
              >
                {d.ratings.healthcareQuality.grade}
              </div>
            ))}

            {/* Safety Row */}
            <div className="flex items-center gap-2">
              <Lucide.ShieldCheck className="size-3 text-neutral-400" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase">
                Safety
              </span>
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className={`text-center text-sm font-bold ${gradeToColor(d.ratings.personalSafety.grade).text}`}
              >
                {d.ratings.personalSafety.grade}
              </div>
            ))}

            {/* Cost Row */}
            <div className="flex items-center gap-2">
              <Lucide.Tag className="size-3 text-neutral-400" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase">
                Cost
              </span>
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className={`text-center text-sm font-bold ${gradeToColor(d.ratings.affordability.grade).text}`}
              >
                {d.ratings.affordability.grade}
              </div>
            ))}

            {/* Visa Row */}
            <div className="flex items-center gap-2">
              <Lucide.FileText className="size-3 text-neutral-400" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase">
                Visa
              </span>
            </div>
            {selectedDestinations.map((d) => (
              <div
                key={d.id}
                className={`text-center text-sm font-bold ${gradeToColor(d.ratings.visaEase.grade).text}`}
              >
                {d.ratings.visaEase.grade}
              </div>
            ))}
          </div>
        </section>
        <div className="overflow-x-auto">
          <div
            className="grid min-w-full"
            style={{
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : `minmax(200px, 1.2fr) repeat(${selectedDestinations.length + (showAddPlaceholder ? 1 : 0)}, minmax(280px, 1fr))`,
            }}
          >
            {/* Destination Headings Row */}
            <div className="contents">
              <div className="sticky left-0 z-10 hidden border-b border-neutral-100 bg-white p-6 md:block" />
              {selectedDestinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className={`border-b border-neutral-100 bg-white p-2 md:p-2 ${
                    index === activeMobileIndex ? "block" : "hidden md:block"
                  } ${isMobile ? "col-span-2" : "col-span-1"}`}
                >
                  <div className="group relative aspect-video overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                      alt={destination.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/0 from-40% to-black/70" />

                    <button
                      onClick={() => toggleDestination(destination)}
                      className="absolute top-3 right-3 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-all hover:bg-red-500 hover:text-white"
                      aria-label={`Remove ${destination.name}`}
                    >
                      <Lucide.X className="size-4" />
                    </button>

                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-xl font-bold text-white">
                        {destination.name}
                      </h3>
                      <p className="text-xs font-medium text-white/80">
                        {destination.region}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Destination Placeholder */}
              {showAddPlaceholder && (
                <div
                  className={`border-b border-neutral-100 bg-white p-4 md:p-6 ${
                    activeMobileIndex === selectedDestinations.length
                      ? "block"
                      : "hidden md:block"
                  } ${isMobile ? "col-span-2" : "col-span-1"}`}
                >
                  <div className="flex aspect-video flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-6 transition-all hover:border-primary/30 hover:bg-neutral-50">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm transition-transform group-hover:scale-110">
                      <Lucide.Plus className="size-5" />
                    </div>
                    <h3 className="mb-4 text-sm font-bold text-neutral-900">
                      Add Destination
                    </h3>
                    <div className="flex w-full gap-2">
                      <Wouter.Link
                        href="/explore"
                        className="flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-100 bg-white px-2 py-2 text-center text-[10px] font-bold text-neutral-600 shadow-sm transition-all hover:bg-primary hover:text-white"
                      >
                        Explore
                      </Wouter.Link>
                      <Wouter.Link
                        href="/matchmaker"
                        className="flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-100 bg-white px-2 py-2 text-center text-[10px] font-bold text-neutral-600 shadow-sm transition-all hover:bg-primary hover:text-white"
                      >
                        Matchmaker
                      </Wouter.Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Comparison Sections */}
            {comparisonSections.map((section) => (
              <React.Fragment key={section.title}>
                {/* Section Title Row */}
                <div
                  className="sticky left-0 z-10 flex items-center justify-between gap-2 bg-neutral-50/50 px-6 py-4"
                  style={{
                    gridColumn: `1 / span ${isMobile ? 2 : selectedDestinations.length + 1 + (showAddPlaceholder ? 1 : 0)}`,
                  }}
                >
                  <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-400 uppercase">
                    {section.icon}
                    {section.title}
                  </div>
                </div>

                {/* Metric Rows */}
                {section.metrics.map((metric) => (
                  <div key={metric.label} className="group contents">
                    <div className="sticky left-0 z-10 flex items-center border-b border-neutral-50 bg-white px-6 py-5 text-sm font-bold text-neutral-500 transition-colors group-hover:bg-neutral-50/50">
                      {metric.label}
                    </div>
                    {selectedDestinations.map((destination, index) => (
                      <div
                        key={`${destination.id}-${metric.label}`}
                        className={`flex items-center border-b border-neutral-50 bg-white px-6 py-5 text-sm font-medium text-neutral-900 transition-colors group-hover:bg-neutral-50/50 ${
                          index === activeMobileIndex
                            ? "block"
                            : "hidden md:block"
                        }`}
                      >
                        {metric.getValue(destination)}
                      </div>
                    ))}
                    {showAddPlaceholder && (
                      <div
                        className={`flex items-center border-b border-neutral-50 bg-white px-6 py-5 group-hover:bg-neutral-50/50 ${
                          activeMobileIndex === selectedDestinations.length
                            ? "block"
                            : "hidden md:block"
                        }`}
                      >
                        <div className="h-4 w-12 rounded bg-neutral-50" />
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Navigation Bar */}
      {isMobile && (selectedDestinations.length > 1 || showAddPlaceholder) && (
        <div className="fixed bottom-8 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 md:hidden">
          <div className="flex items-center justify-between gap-1 rounded-full border border-neutral-200 bg-white/90 p-2 shadow-2xl backdrop-blur-md">
            {selectedDestinations.map((destination, index) => (
              <button
                key={destination.id}
                onClick={() => setActiveMobileIndex(index)}
                className={`flex flex-1 flex-col items-center gap-1.5 rounded-full py-3 transition-all ${
                  index === activeMobileIndex
                    ? "bg-primary text-white shadow-lg"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                <span className="px-2 text-[10px] font-bold whitespace-nowrap">
                  {destination.name}
                </span>
              </button>
            ))}
            {showAddPlaceholder && (
              <button
                onClick={() =>
                  setActiveMobileIndex(selectedDestinations.length)
                }
                className={`flex size-11 items-center justify-center rounded-full transition-all ${
                  activeMobileIndex === selectedDestinations.length
                    ? "bg-primary text-white shadow-lg"
                    : "text-neutral-400 hover:bg-neutral-50"
                }`}
              >
                <Lucide.Plus className="size-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
