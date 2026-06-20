import * as Lucide from "lucide-react";
import * as React from "react";
import * as Wouter from "wouter";
import { ScrollArea } from "@base-ui/react/scroll-area";

import { Page } from "@/components/page";

import pros from "@/data/pros.json" with { type: "json" };
import cons from "@/data/cons.json" with { type: "json" };
import cities from "@/data/cities.json" with { type: "json" };
import destinations from "@/data/destinations.json" with { type: "json" };
import resources from "@/data/resources.json" with { type: "json" };

import type { Destination } from "@/types/destination";
import { climateToIcon } from "@/utils/mappings";

import InternationalLivingLogo from "@/assets/svg/international-living-logo.svg?react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export function Country() {
  const destination = useParamsDestination();
  const ClimateIcon = climateToIcon(destination.climate);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
    compactDisplay: "short",
  });

  return (
    <Page>
      <div className="h-6" />

      <div className="px-6">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-0">
          <p className="">
            <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
              #{destination.region}
            </span>
          </p>
          <Lucide.ChevronRight className="mt-1 size-3.5" />
          <p className="">
            <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
              #{destination.subregion}
            </span>
          </p>
          <Lucide.ChevronRight className="mt-1 size-3.5" />
          <p className="">
            <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
              #{destination.name}
            </span>
          </p>
        </div>

        <div className="h-4" />

        <div className="flex items-center justify-between">
          <div>
            <header>
              <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-neutral-800 lg:text-4xl">
                {destination.name}
              </h1>
            </header>

            <div className="h-2" />

            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <div className="flex items-center gap-1 lg:gap-2">
                <ChipA icon={ClimateIcon} text={destination.climate} />

                <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 lg:size-2" />

                <ChipA icon={Lucide.MapPinned} text={destination.subregion} />
              </div>

              <Lucide.CircleSmall className="hidden size-1.5 fill-neutral-700 stroke-neutral-400 lg:block lg:size-2" />

              <div className="flex items-center gap-1 lg:gap-2">
                <ChipA
                  icon={Lucide.UserRound}
                  text={`Single ${formatter.format(destination.expenditure.single.amount)}/month`}
                />

                <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 lg:size-2" />

                <ChipA
                  icon={Lucide.UsersRound}
                  text={`Couple ${formatter.format(destination.expenditure.couple.amount)}/month`}
                />
              </div>
            </div>
          </div>

          <div className="hidden gap-1 lg:flex">
            <ButtonSave />
            <ButtonShare />
            <ButtonCompare />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="h-4" />

          <div className="flex gap-1">
            <ButtonCompare />
            <ButtonSave />
            <ButtonShare />
          </div>
        </div>
      </div>

      <div className="h-4" />

      <div className="relative h-56 bg-neutral-200 lg:hidden">
        <img
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className="absolute top-0 left-0 size-full object-cover object-center"
        />
      </div>

      <div className="hidden h-120 grid-cols-[8fr_2fr] gap-1 px-6 lg:grid">
        <div className="relative overflow-hidden rounded-s-md bg-neutral-200">
          <img
            src={`/images/destinations/${destination.id}/${destination.id}.webp`}
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
        </div>

        <div className="grid grid-rows-3 gap-1">
          <div className="relative overflow-hidden rounded-tr-md bg-neutral-200">
            <img
              src={`/images/destinations/${destination.id}/${destination.id}.webp`}
              className="absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>
          <div className="relative overflow-hidden bg-neutral-200">
            <img
              src={`/images/destinations/${destination.id}/${destination.id}.webp`}
              className="absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>
          <div className="relative overflow-hidden rounded-br-md bg-neutral-200">
            <img
              src={`/images/destinations/${destination.id}/${destination.id}.webp`}
              className="absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="h-4 lg:hidden" />

      <div className="mt-8 mb-12 hidden px-6 lg:block">
        <ul className="flex gap-8">
          <li>
            <a className="border-b-2 border-neutral-800 py-2 text-sm font-semibold tracking-tight text-neutral-800">
              Overview
            </a>
          </li>

          <li>
            <a className="border-b-2 border-white py-2 text-sm font-semibold tracking-tight text-neutral-800">
              Specialists
            </a>
          </li>

          <li>
            <a className="border-b-2 border-white py-2 text-sm font-semibold tracking-tight text-neutral-800">
              Resources
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[65fr_35fr]">
        <div className="min-w-0 border-neutral-200 lg:border-r lg:pr-2">
          <div className="lg:hidden">
            <div className="px-4">
              <MatchmakerCard destination={destination} />
            </div>

            <div className="h-4" />

            <div className="px-4">
              <InternationalLivingCard destination={destination} />
            </div>
          </div>

          <div className="h-12 lg:h-0" />

          <AtAGlance destination={destination} />

          <div className="h-12" />

          <About destination={destination} />

          <div className="h-12" />

          <CostBreakdown2 destination={destination} />

          {/* <div className="h-12" /> */}
          {/**/}
          {/* <Specialists destination={destination} /> */}
          {/**/}
          {/* <div className="h-12" /> */}
          {/**/}
          {/* <LearnMore destination={destination} /> */}
          {/**/}
          {/* <div className="h-12" /> */}
          {/**/}
          {/* <Similar destination={destination} /> */}
        </div>

        <div className="relative hidden lg:block">
          <div className="sticky top-18">
            <MatchmakerCard destination={destination} />
            <div className="h-4" />
            <InternationalLivingCard destination={destination} />
          </div>
        </div>
      </div>

      <div className="h-12" />

      <Specialists destination={destination} />

      <div className="h-12" />

      <LearnMore destination={destination} />

      <div className="h-12" />

      <Similar destination={destination} />

      <div className="h-16" />
    </Page>
  );
}
function useParamsDestination(): Destination {
  const { id } = Wouter.useParams();

  const destination = React.useMemo(() => {
    return destinations.find((item) => item.id === id);
  }, [id]);

  if (id === undefined) {
    throw new Error("id parameter not found");
  }

  if (destination === undefined) {
    throw new Error("destination not found");
  }

  return destination;
}

function ChipA({
  icon: Icon,
  text,
}: {
  icon: Lucide.LucideIcon;
  text: string;
}) {
  return (
    <div className="flex flex-row items-center justify-start gap-1 lg:gap-1.5">
      <Icon className="size-4 shrink-0 stroke-neutral-800" />

      <div className="flex w-min items-center gap-1 border-b border-neutral-800">
        <span className="text-sm font-medium whitespace-nowrap text-neutral-800">
          {text}
        </span>
      </div>
    </div>
  );
}

function ChipB({
  icon: Icon,
  text,
}: {
  icon: Lucide.LucideIcon;
  text: string;
}) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <Icon className="size-5 shrink-0 stroke-neutral-800" />

      <div className="flex w-min items-center gap-1 border-b border-neutral-600">
        <span className="text-sm font-semibold whitespace-nowrap text-neutral-700">
          {text}
        </span>
      </div>
    </div>
  );
}

function ButtonSave() {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white p-2"
    >
      <Lucide.Heart className="size-4 stroke-neutral-800" />
      {/* <span className="text-xs font-normal text-neutral-800">Save</span> */}
    </button>
  );
}

function ButtonCompare() {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2"
    >
      <Lucide.GitCompareArrows className="size-4 stroke-neutral-800" />
      <span className="text-xs font-semibold tracking-tight text-neutral-800">
        Compare
      </span>
    </button>
  );
}

function ButtonShare() {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white p-2"
    >
      <Lucide.Share2 className="size-4 stroke-neutral-800" />
      {/* <span className="text-xs font-normal text-neutral-800">Share</span> */}
    </button>
  );
}

function Title({ children }: { children: string }) {
  return (
    <h3 className="w-min text-lg leading-tight font-semibold tracking-tight whitespace-nowrap text-neutral-800 lg:text-xl">
      {children}
    </h3>
  );
}

function calculate30yr(
  destination: Destination,
): Record<"single" | "couple", { base: number; inflated: number }> {
  const calc = (monthly: number, inflation: number) => {
    const yearly = monthly * 12;
    const base = yearly * 30;
    const inflated = yearly * (((1 + inflation) ** 30 - 1) / inflation);
    return { base, inflated };
  };

  const single = calc(
    destination.expenditure.single.amount,
    destination.inflationRate,
  );

  const couple = calc(
    destination.expenditure.couple.amount,
    destination.inflationRate,
  );

  return { single, couple };
}

function RatingsRadarBasic({
  mainDestination: destination,
}: {
  mainDestination: Destination;
}) {
  const gradeToValue = (grade: string) => {
    switch (grade) {
      case "A":
        return 4;
      case "B":
        return 3;
      case "C":
        return 2;
      case "D":
        return 1;
      default:
        return 0;
    }
  };

  const labelMapping: Record<string, string> = {
    affordability: "Cost",
    healthcareQuality: "Health",
    personalSafety: "Safety",
    politicalStability: "Stability",
    visaEase: "Visa",
    taxEnvironment: "Tax",
    // infrastructure: "Infrastructure",
    // weatherComfort: "Weather",
    // healthcareCost: "Health Cost",
    // economy: "Economy",
  };

  const ratings = Object.fromEntries(
    Object.entries(destination.ratings).filter(([key]) => {
      return key in labelMapping;
    }),
  );

  const labels = Object.keys(ratings).map((key) => labelMapping[key] ?? key);

  const datasets = [
    {
      label: destination.name,
      data: Object.values(ratings).map((r) => gradeToValue(r.grade)),
      backgroundColor: "rgba(0, 95, 85, 0.2)",
      borderColor: "#005F55",
      borderWidth: 1,
      pointBackgroundColor: "#005F55",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#005F55",
    },
  ];

  const data = {
    labels,
    datasets,
  };

  const options = {
    layout: {
      padding: 0,
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        suggestedMin: 0,
        suggestedMax: 4,
        ticks: {
          stepSize: 1,
          callback: (value: number) => {
            switch (value) {
              case 4:
                return "A";
              case 3:
                return "B";
              case 2:
                return "C";
              case 1:
                return "D";
              default:
                return "";
            }
          },
          showLabelBackdrop: false,
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
        pointLabels: {
          font: {
            size: 12,
            weight: "600" as const,
            family: "Sora Variable",
          },
          color: "#666",
          padding: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label: string }; raw: unknown }) => {
            const value = context.raw as number;
            const grades = ["", "D", "C", "B", "A"];
            return `${context.dataset.label}: ${grades[value]}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2"> */}
      {/*   {datasets.map((ds, i) => ( */}
      {/*     <div key={i} className="flex items-center gap-1.5"> */}
      {/*       <div */}
      {/*         className="h-5 w-1" */}
      {/*         style={{ */}
      {/*           backgroundColor: ds.backgroundColor as string, */}
      {/*         }} */}
      {/*       /> */}
      {/*       <p */}
      {/*         className={`border-b border-neutral-800 text-sm font-normal ${i === 0 ? "text-neutral-800" : "text-neutral-500"}`} */}
      {/*       > */}
      {/*         {ds.label} */}
      {/*       </p> */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}

      <div className="h-80 w-full">
        {/* @ts-ignore */}
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

function Location({ destination }: { destination: Destination }) {
  const apiKey: string = "AIzaSyBrz6B9dpe6eDvFL1u60FTogOeqOknozYU";
  const encodedName: string = encodeURIComponent(destination.name);
  const address = `${encodedName}, ${destination.region}`;
  const encodedAddress: string = encodeURIComponent(address);
  const mapsUrl: string = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;

  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
      <iframe
        src={mapsUrl}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-64 w-full border-none"
      />
    </div>
  );
}

function LearnMore({ destination }: { destination: Destination }) {
  return (
    <div className="px-6">
      <Title>Learn more</Title>

      <div className="h-4" />

      <div className="hidden grid-cols-3 gap-4 lg:grid">
        {resources
          .filter((item) => item.destination === destination.id)
          .toSorted((itemA, itemB) => {
            if (itemA.platform === "YouTube") {
              return -1;
            }
            if (itemB.platform === "YouTube") {
              return 1;
            }
            if (itemA.platform === "International Living") {
              return -1;
            }
            if (itemB.platform === "International Living") {
              return 1;
            }
            return 0;
          })
          .map((resource) => {
            const formatter = new Intl.DateTimeFormat(undefined, {
              month: "short",
              year: "numeric",
            });

            return (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-76 snap-start lg:w-full"
              >
                <article className="flex h-116 flex-col rounded-md border border-neutral-300 bg-white p-2">
                  <div className="relative h-48 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-50">
                    {resource.platform === "YouTube" ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${new URL(resource.url).searchParams.get("v")}`}
                        title={resource.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                        className="absolute top-0 left-0 size-full object-cover object-center"
                      />
                    )}
                  </div>

                  <div className="h-2" />

                  <div className="flex grow flex-col px-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-neutral-700">
                        {resource.platform}
                      </p>

                      <p className="text-xs font-medium text-neutral-700">
                        {formatter.format(new Date(resource.date))}
                      </p>

                      {/* <div className="flex gap-2"> */}
                      {/*   <button type="button" className="contents"> */}
                      {/*     <Lucide.Share2 className="size-4 stroke-neutral-600" /> */}
                      {/*   </button> */}
                      {/*   <button type="button" className="contents"> */}
                      {/*     <Lucide.Heart className="size-4 stroke-neutral-600" /> */}
                      {/*   </button> */}
                      {/* </div> */}
                    </div>

                    <div className="h-2" />

                    <h4 className="line-clamp-3 text-base leading-tight font-bold tracking-tight text-neutral-900">
                      {resource.title}
                    </h4>

                    <div className="h-1" />

                    <div className="flex flex-wrap items-center gap-1">
                      {resource.tags.map((tag) => {
                        return (
                          <React.Fragment key={tag}>
                            <p className="text-xs font-semibold text-neutral-800 capitalize">
                              {tag}
                            </p>
                            <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 last:hidden" />
                          </React.Fragment>
                        );
                      })}
                    </div>

                    <div className="h-2" />

                    <p className="line-clamp-4 text-xs leading-relaxed text-neutral-700">
                      {resource.description}
                    </p>

                    <div className="h-2" />

                    <div className="grow" />

                    <div className="h-px bg-neutral-300" />

                    <div className="h-4" />

                    <div className="flex items-center gap-1">
                      {resource.platform === "YouTube" ? (
                        <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
                          <Lucide.Play className="size-3.5 fill-accent stroke-neutral-800" />
                          <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
                            Watch video
                          </span>
                        </div>
                      ) : (
                        <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
                          <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
                            Read more
                          </span>
                          <Lucide.ArrowRight className="size-4 stroke-primary" />
                        </div>
                      )}

                      <div className="grow" />

                      <button type="button" className="contents">
                        <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600">
                          <Lucide.Share2 className="size-4 stroke-neutral-600" />
                        </div>
                      </button>

                      <button type="button" className="contents">
                        <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600">
                          <Lucide.Heart className="size-4 stroke-neutral-600" />
                        </div>
                      </button>
                    </div>

                    <div className="h-2" />
                  </div>
                </article>
              </a>
            );
          })}
      </div>

      <ScrollArea.Root className="lg:hidden">
        <ScrollArea.Viewport className="snap-x snap-mandatory">
          <ScrollArea.Content className="flex gap-4">
            {resources
              .filter((item) => item.destination === destination.id)
              .toSorted((itemA, itemB) => {
                if (itemA.platform === "YouTube") {
                  return -1;
                }
                if (itemB.platform === "YouTube") {
                  return 1;
                }
                if (itemA.platform === "International Living") {
                  return -1;
                }
                if (itemB.platform === "International Living") {
                  return 1;
                }
                return 0;
              })
              .map((resource) => {
                const formatter = new Intl.DateTimeFormat(undefined, {
                  month: "short",
                  year: "numeric",
                });

                return (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-76 snap-start"
                  >
                    <article className="flex h-116 flex-col rounded-md border border-neutral-300 bg-white p-2">
                      <div className="relative h-48 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-50">
                        {resource.platform === "YouTube" ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${new URL(resource.url).searchParams.get("v")}`}
                            title={resource.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <img
                            src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                            className="absolute top-0 left-0 size-full object-cover object-center"
                          />
                        )}
                      </div>

                      <div className="h-2" />

                      <div className="flex grow flex-col px-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-neutral-700">
                            {resource.platform}
                          </p>

                          <p className="text-xs font-medium text-neutral-700">
                            {formatter.format(new Date(resource.date))}
                          </p>

                          {/* <div className="flex gap-2"> */}
                          {/*   <button type="button" className="contents"> */}
                          {/*     <Lucide.Share2 className="size-4 stroke-neutral-600" /> */}
                          {/*   </button> */}
                          {/*   <button type="button" className="contents"> */}
                          {/*     <Lucide.Heart className="size-4 stroke-neutral-600" /> */}
                          {/*   </button> */}
                          {/* </div> */}
                        </div>

                        <div className="h-2" />

                        <h4 className="line-clamp-3 text-base leading-tight font-bold tracking-tight text-neutral-900">
                          {resource.title}
                        </h4>

                        <div className="h-1" />

                        <div className="flex flex-wrap items-center gap-1">
                          {resource.tags.map((tag) => {
                            return (
                              <React.Fragment key={tag}>
                                <p className="text-xs font-semibold text-neutral-800 capitalize">
                                  {tag}
                                </p>
                                <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 last:hidden" />
                              </React.Fragment>
                            );
                          })}
                        </div>

                        <div className="h-2" />

                        <p className="line-clamp-4 text-xs leading-relaxed text-neutral-700">
                          {resource.description}
                        </p>

                        <div className="h-2" />

                        <div className="grow" />

                        <div className="h-px bg-neutral-300" />

                        <div className="h-4" />

                        <div className="flex items-center gap-1">
                          {resource.platform === "YouTube" ? (
                            <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
                              <Lucide.Play className="size-3.5 fill-accent stroke-neutral-800" />
                              <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
                                Watch video
                              </span>
                            </div>
                          ) : (
                            <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
                              <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
                                Read more
                              </span>
                              <Lucide.ArrowRight className="size-4 stroke-primary" />
                            </div>
                          )}

                          <div className="grow" />

                          <button type="button" className="contents">
                            <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600">
                              <Lucide.Share2 className="size-4 stroke-neutral-600" />
                            </div>
                          </button>

                          <button type="button" className="contents">
                            <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600">
                              <Lucide.Heart className="size-4 stroke-neutral-600" />
                            </div>
                          </button>
                        </div>

                        <div className="h-2" />
                      </div>
                    </article>
                  </a>
                );
              })}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
}

function Specialists({
  destination: _destination,
}: {
  destination: Destination;
}) {
  const specialists = [0, 1, 2, 3, 4, 5];
  return (
    <div className="px-6">
      <Title>Specialists</Title>

      <div className="h-4" />

      <ScrollArea.Root className="">
        <ScrollArea.Viewport className="snap-x snap-mandatory">
          <ScrollArea.Content className="flex gap-4">
            {specialists.map((item) => {
              return (
                <article
                  key={item}
                  className="h-96 w-80 snap-start rounded-md border border-neutral-300 bg-neutral-50"
                ></article>
              );
            })}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
}

function About({ destination }: { destination: Destination }) {
  return (
    <div className="px-6">
      <Title>About</Title>

      <div className="h-4" />

      <p className="text-sm leading-relaxed text-neutral-700">
        {destination.description}
      </p>

      <div className="h-4" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[45fr_55fr]">
        <Location destination={destination} />

        <ul className="flex flex-col">
          {cities
            .filter((city) => destination.topCities.includes(city.id))
            .map((city) => {
              return (
                <li
                  key={city.name}
                  className="border-b border-neutral-300 py-4"
                >
                  <p className="text-sm font-medium text-neutral-800">
                    {city.name}
                  </p>

                  <div className="h-1" />

                  <p className="text-xs text-neutral-700">{city.description}</p>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="h-4 lg:h-8" />

      <h4 className="text-sm font-semibold tracking-tight text-neutral-800 lg:text-base">
        Pros
      </h4>

      <div className="h-4" />

      <ul className="flex flex-col gap-4">
        {pros
          .filter((p) => destination.pros.includes(p.id))
          .map((pro) => (
            <li key={pro.id}>
              <div className="flex items-start gap-2">
                <Lucide.CircleCheck className="my-0.5 size-4 shrink-0 text-green-700" />

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    {pro.name}
                  </p>

                  <div className="h-1" />

                  <p className="text-xs text-neutral-700">{pro.description}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>

      <div className="h-4 lg:h-6" />

      <h4 className="text-sm font-semibold tracking-tight text-neutral-800 lg:text-base">
        Cons
      </h4>

      <div className="h-4" />

      <ul className="flex flex-col gap-4">
        {cons
          .filter((p) => destination.cons.includes(p.id))
          .map((con) => (
            <li key={con.id}>
              <div className="flex items-start gap-2">
                <Lucide.AlertCircle className="my-0.5 size-4 shrink-0 text-amber-600" />

                <div>
                  <p className="text-sm font-medium text-neutral-800">
                    {con.name}
                  </p>

                  <div className="h-1" />

                  <p className="text-xs text-neutral-700">{con.description}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function AtAGlance({ destination }: { destination: Destination }) {
  const cost30yr = calculate30yr(destination);

  const similar = destinations.filter((item) =>
    destination.similarDestinations.includes(item.id),
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
    compactDisplay: "short",
  });

  return (
    <div className="px-6">
      <Title>At a glance</Title>

      <div className="h-4" />

      <div className="lg:hidden">
        <p className="text-sm leading-relaxed text-neutral-700">
          A 30-year retirement in {destination.name} is estimated to cost{" "}
          <span className="font-semibold text-neutral-900 underline">
            {formatter.format(cost30yr.single.inflated)}
          </span>{" "}
          for singles and{" "}
          <span className="font-semibold text-neutral-900 underline">
            {formatter.format(cost30yr.couple.inflated)}
          </span>{" "}
          for couples assuming a{" "}
          <span className="font-semibold text-neutral-900 underline">
            {destination.inflationRate * 100}%
          </span>{" "}
          inflation rate.
        </p>

        <div className="h-6" />

        <RatingsRadarBasic mainDestination={destination} />

        <div className="h-6" />

        <div className="flex flex-wrap items-center gap-4">
          <ChipB icon={Lucide.Languages} text={"Basic english"} />
          <ChipB icon={Lucide.PersonStanding} text={"Densly populated"} />
          <ChipB icon={Lucide.HeartPulse} text={"76 years"} />
          <ChipB icon={Lucide.UsersRound} text={"Thriving expat community"} />
        </div>
      </div>

      <div className="hidden lg:block">
        <p className="text-sm leading-relaxed text-neutral-700">
          A 30-year retirement in {destination.name} is estimated to cost{" "}
          <span className="font-semibold text-neutral-900 underline">
            {formatter.format(cost30yr.single.inflated)}
          </span>{" "}
          for singles and{" "}
          <span className="font-semibold text-neutral-900 underline">
            {formatter.format(cost30yr.couple.inflated)}
          </span>{" "}
          for couples assuming a{" "}
          <span className="font-semibold text-neutral-900 underline">
            {destination.inflationRate * 100}%
          </span>{" "}
          inflation rate.
        </p>

        <div className="h-4" />

        <div className="flex flex-wrap items-center gap-4">
          <ChipB icon={Lucide.Languages} text={"Basic english"} />
          <ChipB icon={Lucide.PersonStanding} text={"Densly populated"} />
          <ChipB icon={Lucide.HeartPulse} text={"76 years"} />
          <ChipB icon={Lucide.UsersRound} text={"Thriving expat community"} />
        </div>

        <div className="h-8" />

        <div className="grid grid-cols-[6fr_4fr] gap-4">
          <div>
            <RatingsRadarBasic mainDestination={destination} />
          </div>

          <div className="flex flex-col gap-4 py-2">
            <div className="rounded-md border-0 border-primary bg-[rgba(0,95,85,0.1)] p-2">
              <DestinationCardSnippet destination={destination} />
            </div>

            <div className="rounded-md border-0 border-accent bg-neutral-100 p-2">
              <DestinationCardSnippet destination={similar[0]!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DestinationCardSnippet({ destination }: { destination: Destination }) {
  const ClimateIcon = climateToIcon(destination.climate);

  return (
    <div className="grid grid-cols-[40px_auto] gap-2">
      <div className="relative aspect-square overflow-hidden rounded-full border border-neutral-800 bg-neutral-50">
        <img
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          alt={destination.name}
          className="top-0 left-0 size-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col justify-center gap-0.5 text-left">
        <p className="line-clamp-2 text-sm leading-tight font-semibold tracking-tight text-neutral-800">
          {destination.name}
        </p>

        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center gap-0.5">
            <ClimateIcon className="size-3 shrink-0 stroke-neutral-700" />
            <p className="text-xs leading-none font-medium text-neutral-700">
              {destination.climate}
            </p>
          </div>

          <Lucide.CircleSmall className="size-2 fill-neutral-700 stroke-neutral-700" />

          <div className="flex items-center gap-0.5">
            <Lucide.MapPinned className="size-3 shrink-0 stroke-neutral-700" />
            <p className="text-xs leading-none font-medium whitespace-nowrap text-neutral-700">
              {destination.region}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InternationalLivingCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <a
      target="_blank"
      href={`https://www.internationalliving.com/countries/${destination.id}`}
    >
      <div className="grid grid-cols-[6fr_4fr] gap-4 rounded-lg border border-neutral-400 p-4 shadow-md">
        <div>
          <p className="text-xl leading-none font-bold tracking-tight text-neutral-900">
            Learn more <br /> about{" "}
            <span className="text-il-blue"> {destination.name}</span>!
          </p>

          <div className="h-2" />

          <p className="text-sm text-neutral-700">
            Get detailed insights, expat stories, reports from International
            Living.
          </p>

          <div className="h-4" />

          <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-il-yellow px-6 py-2 outline outline-il-blue/25">
            <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
              Learn more
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative grow overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
            <img
              src={`/images/destinations/${destination.id}/${destination.id}-il.webp`}
              className="absolute top-0 left-0 size-full object-cover object-center"
            />
          </div>

          <InternationalLivingLogo className="h-10 fill-il-blue stroke-il-blue" />
        </div>
      </div>
    </a>
  );
}

function MatchmakerCard({ destination }: { destination: Destination }) {
  return (
    <Wouter.Link href={"/matchmaker"} className="contents">
      <article className="grid grid-cols-[4fr_6fr] gap-6 overflow-hidden rounded-md bg-primary/10 p-4">
        <div className="relative">
          <img
            className="absolute top-0 left-0 size-full -rotate-3 rounded-md object-cover object-center shadow-lg"
            src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          />
        </div>
        <div className="py-2">
          <p className="text-xl leading-none font-bold tracking-tight text-neutral-900">
            Find your <br />
            perfect match
          </p>

          <div className="h-2" />

          <p className="text-sm font-medium text-neutral-700">
            Take our matchmaker quiz and find out if{" "}
            <span className="font-semibold text-neutral-900 underline">
              {destination.name}
            </span>{" "}
            is the right fit for you
          </p>

          <div className="h-4" />

          <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
            <Lucide.Play className="size-3.5 fill-accent stroke-neutral-800" />
            <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
              Start quiz
            </span>
          </div>
        </div>
      </article>
    </Wouter.Link>
  );
}

function CostBreakdown2({ destination }: { destination: Destination }) {
  const cost30yr = calculate30yr(destination);

  const formatters = {
    monthly: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      roundingIncrement: 100,
      roundingMode: "ceil",
      style: "currency",
      currency: "USD",
    }),
    yearly: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      roundingIncrement: 1000,
      roundingMode: "ceil",
      style: "currency",
      currency: "USD",
    }),
    short: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
      compactDisplay: "short",
    }),
  };

  return (
    <div className="px-6">
      <div className="rounded-md border border-neutral-300 shadow-md">
        <div className="bg-neutral-100">
          <div className="h-4" />

          <p className="px-4 text-base font-semibold tracking-tight text-neutral-900">
            Cost breakdown
          </p>

          <div className="h-4" />
        </div>

        <div className="h-px bg-neutral-300" />
        <div className="h-4" />

        <div className="px-4">
          <p className="text-sm font-semibold tracking-tight text-neutral-800">
            Monthly
          </p>

          <div className="h-4" />

          <LineItem
            text="Single"
            amount={formatters.monthly.format(
              destination.expenditure.single.amount,
            )}
          />

          <div className="h-4" />

          <LineItem
            text="Couple"
            amount={formatters.monthly.format(
              destination.expenditure.single.amount,
            )}
          />
        </div>

        <div className="h-6" />
        <div className="h-px bg-neutral-300" />
        <div className="h-4" />

        <div className="px-4">
          <p className="text-sm font-semibold tracking-tight text-neutral-800">
            Yearly
          </p>

          <div className="h-4" />

          <LineItem
            text="Single"
            amount={formatters.monthly.format(
              12 * destination.expenditure.single.amount,
            )}
          />

          <div className="h-4" />

          <LineItem
            text="Couple"
            amount={formatters.monthly.format(
              12 * destination.expenditure.couple.amount,
            )}
          />
        </div>

        <div className="h-6" />
        <div className="h-px bg-neutral-300" />
        <div className="h-4" />

        <div className="px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-tight text-neutral-800">
              30 Year
            </p>

            <div className="flex gap-1">
              <Lucide.TrendingUp className="size-4 stroke-red-700" />
              <p className="text-xs text-red-700">2.5% inflation</p>
            </div>
          </div>

          <div className="h-4" />

          <LineItem
            text="Single"
            amount={formatters.monthly.format(cost30yr.single.inflated)}
          />

          <div className="h-4" />

          <LineItem
            text="Couple"
            amount={formatters.monthly.format(cost30yr.couple.inflated)}
          />
        </div>

        <div className="h-6" />
        <div className="h-px bg-neutral-300" />
        <div className="h-4" />

        <p className="mx-4 w-min border-b border-neutral-700 text-xs whitespace-nowrap text-neutral-700">
          Find your retirement costs
        </p>

        <div className="h-4" />
      </div>
    </div>
  );
}

function LineItem({ text, amount }: { text: string; amount: string }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <p className="text-sm leading-none font-normal text-neutral-700">
        {text}
      </p>
      <div className="mb-0.5 grow border-b border-dashed border-neutral-400" />

      <p className="font-roboto-mono text-sm leading-none font-semibold text-neutral-700">
        {amount}
      </p>
    </div>
  );
}

function Similar({ destination }: { destination: Destination }) {
  const similar = destinations.filter((item) =>
    destination.similarDestinations.includes(item.id),
  );

  return (
    <div className="px-6">
      <Title>Similar destinations</Title>

      <div className="h-6" />

      <ScrollArea.Root>
        <ScrollArea.Viewport className="snap-x snap-mandatory">
          <ScrollArea.Content className="flex gap-4">
            {similar.map((item) => {
              console.log(item.name);
              return (
                <article
                  key={item.name}
                  className="relative h-64 w-72 snap-start overflow-hidden rounded-md border border-neutral-300 bg-neutral-50"
                >
                  <img
                    src={`/images/destinations/${item.id}/${item.id}.webp`}
                    className="absolute top-0 left-0 size-full object-cover object-center"
                  />

                  <div className="absolute top-0 left-0 size-full bg-linear-to-b from-black/0 from-50% to-black" />

                  <header className="absolute bottom-0 left-0 p-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {item.name}
                    </h3>
                  </header>
                </article>
              );
            })}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
}

// function ChipC({ text }: { text: string }) {
//   return (
//     <div className="rounded-sm border-0 border-neutral-200 bg-primary/10 px-1.5 py-1">
//       <p className="text-xs font-medium whitespace-nowrap text-neutral-900">
//         {text}
//       </p>
//     </div>
//   );
// }
