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
  const cost30yr = calculate30yr(destination);
  // const cities: readonly City[] = citiesData

  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   maximumFractionDigits: 0,
  // });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
    compactDisplay: "short", // 'short' gives you 'M', 'long' gives you 'million'
  });

  return (
    <Page>
      <div className="h-4" />

      <div className="px-6">
        <header>
          <h1 className="text-2xl leading-tight font-black tracking-tight text-neutral-800">
            {destination.name}
          </h1>
        </header>

        <div className="h-2" />

        <div className="flex items-center gap-1">
          <ChipA icon={ClimateIcon} text={destination.climate} />

          <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400" />

          <ChipA icon={Lucide.MapPinned} text={destination.subregion} />
        </div>

        <div className="h-2" />

        <div className="flex items-center gap-1">
          <ChipA
            icon={Lucide.UserRound}
            text={`Single ${formatter.format(destination.expenditure.single.amount)}/month`}
          />

          <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400" />

          <ChipA
            icon={Lucide.UsersRound}
            text={`Couple ${formatter.format(destination.expenditure.couple.amount)}/month`}
          />
        </div>

        <div className="h-4" />

        <div className="flex gap-1">
          <ButtonSave />
          <ButtonCompare />
          <ButtonShare />
        </div>
      </div>

      <div className="h-4" />

      <div className="relative h-56 bg-neutral-200">
        <img
          src={`/images/destinations/${destination.id}/${destination.id}.webp`}
          className="absolute top-0 left-0 size-full object-cover object-center"
        />
      </div>

      <div className="h-4" />

      <div className="px-4">
        <Wouter.Link href={"/matchmaker"} className="contents">
          <article className="grid grid-cols-[4fr_6fr] gap-6 overflow-hidden rounded-md bg-primary/10 p-4">
            <div className="relative">
              <img
                className="absolute top-0 left-0 size-full -rotate-3 rounded-md object-cover object-center shadow-lg"
                src={`/images/destinations/${destination.id}/${destination.id}.webp`}
              />
            </div>
            <div className="py-2">
              <p className="text-xl leading-none font-black tracking-tight text-neutral-900">
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
      </div>

      <div className="h-4" />

      <div className="px-4">
        <div className="grid grid-cols-[6fr_4fr] gap-4 rounded-lg border border-neutral-400 p-4 shadow-md">
          <div>
            <p className="text-xl leading-none font-black tracking-tight text-neutral-900">
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
      </div>

      <div className="h-12" />

      <div className="px-6">
        <Title>At a glance</Title>

        <div className="h-4" />

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

        <RatingsRadar mainDestination={destination} />

        <div className="h-6" />

        <div className="flex flex-wrap items-center gap-4">
          <ChipB icon={Lucide.Languages} text={"Basic english"} />
          <ChipB icon={Lucide.PersonStanding} text={"Densly populated"} />
          <ChipB icon={Lucide.HeartPulse} text={"76 years"} />
          <ChipB icon={Lucide.UsersRound} text={"Thriving expat community"} />
        </div>
      </div>

      <div className="h-12" />

      <div className="px-6">
        <Title>About</Title>

        <div className="h-4" />

        <p className="text-sm leading-relaxed text-neutral-700">
          {destination.description}
        </p>

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

        <div className="h-4" />

        <h4 className="text-sm font-semibold tracking-tight text-neutral-800">
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

                    <p className="text-xs text-neutral-700">
                      {pro.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <div className="h-4" />

        <h4 className="text-sm font-semibold tracking-tight text-neutral-800">
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

                    <p className="text-xs text-neutral-700">
                      {con.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="h-12" />

      <div className="px-6">
        <Title>Learn more</Title>

        <div className="h-4" />

        <ScrollArea.Root>
          <ScrollArea.Viewport className="snap-x snap-mandatory">
            <ScrollArea.Content className="flex gap-4">
              {resources
                .filter((item) => item.destination === destination.id)
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
                      <article className="flex h-116 flex-col rounded-md border border-neutral-200 bg-white p-2">
                        <div className="relative h-48 overflow-hidden rounded-sm border border-neutral-200 bg-neutral-50">
                          <img
                            src={`/images/destinations/${destination.id}/${destination.id}.webp`}
                            className="absolute top-0 left-0 size-full object-cover object-center"
                          />
                        </div>

                        <div className="h-2" />

                        <div className="flex grow flex-col px-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <p className="text-xs font-medium text-neutral-700">
                                {resource.platform},
                              </p>

                              <p className="text-xs font-medium text-neutral-700">
                                {formatter.format(new Date(resource.date))}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <button type="button" className="contents">
                                <Lucide.Share2 className="size-4 stroke-neutral-600" />
                              </button>
                              <button type="button" className="contents">
                                <Lucide.Heart className="size-4 stroke-neutral-600" />
                              </button>
                            </div>
                          </div>

                          <div className="h-2" />

                          <h4 className="line-clamp-3 text-base leading-tight font-bold tracking-tight text-neutral-900">
                            {resource.title}
                          </h4>

                          <div className="h-1" />

                          <div className="flex flex-wrap items-center gap-1">
                            {resource.tags.map((tag) => {
                              return (
                                <>
                                  <p className="text-xs font-semibold text-neutral-800 capitalize">
                                    {tag}
                                  </p>
                                  <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 last:hidden" />
                                </>
                              );
                            })}
                          </div>

                          <div className="h-2" />

                          <p className="line-clamp-4 text-xs leading-relaxed text-neutral-700">
                            {resource.description}
                          </p>

                          <div className="h-2" />

                          <div className="grow" />

                          <div className="h-px bg-neutral-200" />

                          <div className="h-4" />

                          <button
                            type="button"
                            className="flex w-min items-center justify-center gap-2 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-4 py-2"
                          >
                            <span className="text-xs font-normal whitespace-nowrap text-neutral-800">
                              {resource.platform === "YouTube"
                                ? "Watch video"
                                : "Read more"}
                            </span>
                            {resource.platform === "YouTube" ? (
                              <Lucide.Play className="size-3.5 stroke-neutral-800" />
                            ) : (
                              <Lucide.ArrowRight className="size-3.5 stroke-neutral-800" />
                            )}
                          </button>

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

      <div className="h-12" />

      <div className="px-6">
        <Title>Specialists</Title>

        <div className="h-4" />

        <ScrollArea.Root>
          <ScrollArea.Viewport className="snap-x snap-mandatory">
            <ScrollArea.Content className="flex gap-4">
              {[0, 1, 2, 3, 4].map((item) => {
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

      <div className="h-12" />

      <div className="px-6">
        <Title>Location</Title>

        <div className="h-4" />
      </div>

      <div className="h-64" />
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
    <div className="flex flex-row items-center justify-start gap-1">
      <Icon className="size-4 shrink-0 stroke-neutral-800" />

      <div className="flex w-min items-center gap-1 border-b border-neutral-600">
        <span className="text-sm font-medium whitespace-nowrap text-neutral-700">
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
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2"
    >
      <Lucide.Heart className="size-4 stroke-neutral-800" />
      <span className="text-xs font-normal text-neutral-800">Save</span>
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
      <span className="text-xs font-normal text-neutral-800">Compare</span>
    </button>
  );
}

function ButtonShare() {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2"
    >
      <Lucide.Share2 className="size-4 stroke-neutral-800" />
      <span className="text-xs font-normal text-neutral-800">Share</span>
    </button>
  );
}

function Title({ children }: { children: string }) {
  return (
    <h3 className="text-xl leading-tight font-bold tracking-tight text-neutral-800">
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

function RatingsRadar({
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

// function Location({ destination }: { destination: Destination }) {
//   const apiKey: string = "AIzaSyBrz6B9dpe6eDvFL1u60FTogOeqOknozYU";
//   const encodedName: string = encodeURIComponent(destination.name);
//   const address = `${encodedName}, ${destination.region}`;
//   const encodedAddress: string = encodeURIComponent(address);
//   const mapsUrl: string = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;
//
//   return (
//     <section className="px-6">
//       <h3 className="text-xl font-bold tracking-tight text-neutral-800">
//         Location
//       </h3>
//       <div className="h-4" />
//       <div className="overflow-hidden rounded-xl border border-neutral-200">
//         <iframe
//           src={mapsUrl}
//           referrerPolicy="no-referrer-when-downgrade"
//           allowFullScreen
//           className="h-64 w-full border-none"
//         />
//         <div className="flex flex-col gap-2 bg-white p-4">
//           <div className="flex flex-row items-center gap-2">
//             <Lucide.MapPinned className="size-4 text-neutral-800" />
//             <span className="text-sm font-medium text-neutral-700">
//               {destination.name}, {destination.region}
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
