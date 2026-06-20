import * as Lucide from "lucide-react";
import * as React from "react";
import * as Wouter from "wouter";
import { ScrollArea } from "@base-ui/react/scroll-area";

import { Page } from "@/components/page";

import resources from "@/data/specialist-resources.json" with { type: "json" };

export function SJP() {
  return (
    <Page>
      <div className="h-6" />

      <div className="flex flex-wrap items-center gap-x-1 gap-y-0 px-6">
        <p className="">
          <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
            Specialists
          </span>
        </p>

        <Lucide.ChevronRight className="mt-1 size-3.5" />

        <p className="">
          <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
            Finance
          </span>
        </p>

        <Lucide.ChevronRight className="mt-1 size-3.5" />

        <p className="">
          <span className="border-b-0 border-neutral-800 text-xs font-medium text-neutral-800">
            St. James's Place
          </span>
        </p>
      </div>

      <div className="h-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[65fr_35fr]">
        <div className="min-w-0 border-neutral-200 lg:border-r lg:pr-2">
          <div className="grid grid-cols-[min-content_auto_min-content] gap-6 px-6">
            <div className="relative aspect-square h-32 overflow-hidden rounded-md border border-neutral-300 bg-neutral-50">
              <img
                src="/images/st-james-place-logo.jpg"
                className="absolute top-0 left-0 size-full object-contain object-center p-4"
              />
            </div>

            <div className="">
              <header>
                <h1 className="text-2xl leading-tight font-semibold tracking-tight text-neutral-800 lg:text-2xl">
                  St. James' Place plc
                </h1>
              </header>

              <div className="h-2" />

              <div className="relative flex max-w-90 flex-row flex-wrap gap-x-4 gap-y-2 overflow-hidden rounded-md">
                <ChipB text="English" icon={Lucide.Languages} />

                <ChipB text="01268 44 7445" icon={Lucide.PhoneOutgoing} />

                <ChipB text="www.sjp.co.uk" icon={Lucide.Globe} />

                <ChipB
                  text="Cirencester, England, UK"
                  icon={Lucide.Building2}
                />
              </div>

              <div className="h-4" />

              <div className="relative flex gap-1 overflow-hidden rounded-md">
                <ChipC text="Finance" />
                <ChipC text="Wealth Management" />
              </div>

              <div className="h-4" />
            </div>

            <div>
              <div className="hidden gap-1 lg:flex">
                <ButtonShare />
                <ButtonSave />
              </div>
            </div>
          </div>

          <div className="h-6" />

          <div className="px-6">
            <div className="relative h-96 overflow-hidden rounded-md border border-neutral-300 bg-neutral-50">
              <img
                src="/images/st-james-place-hq.jpg"
                className="absolute top-0 left-0 size-full object-cover object-center"
              />
            </div>
          </div>

          <div className="h-12" />

          <Paragraph
            title="St. James's Place"
            body="St. James's Place plc (SJP) is the UK's largest wealth management company, managing over £220 billion in client assets for nearly one million clients. Founded in 1991 by Sir Mark Weinberg, Mike Wilson, and Lord Jacob Rothschild, the Gloucestershire-headquartered firm has grown to become a dominant force in the UK's financial advice and wealth management sector. As a FTSE 100 company listed on the London Stock Exchange, SJP is widely recognized for its robust corporate foundation, regulatory compliance, and a long-standing reputation for financial stability."
          />

          <div className="h-8" />

          <Paragraph
            title="Personalised Relationship-Based Advice"
            body="At the heart of SJP's business model is the St. James's Place Partnership, a dedicated network of nearly 5,000 partner advisers. Rather than offering transactional online advice, SJP prioritizes long-term, relationship-based, and face-to-face financial planning. This model is designed to provide clients with a designated personal adviser who understands their individual circumstances, family dynamics, and long-term financial goals, bringing a high level of reassurance and clarity to complex wealth decisions."
          />

          <div className="h-8" />

          <Paragraph
            title="The 'Manager of Managers' Philosophy"
            body="SJP operates under a 'manager of managers' investment approach. Rather than employing in-house fund managers, SJP’s internal Investment Committee is responsible for researching, selecting, and monitoring elite third-party fund managers from across the globe. This structure allows them to build highly diversified, institutional-grade portfolios and dynamically replace underperforming managers without causing tax implications or administrative burdens for the client. While the advice model is restricted to SJP's own range of funds, this curated selection represents a diverse array of global strategies overseen by industry-leading professionals."
          />

          <div className="h-8" />

          <Paragraph
            title="Holistic Financial Planning"
            body="St. James's Place offers a comprehensive suite of services that extend far beyond simple investment management. Their holistic planning covers retirement planning, pension consolidation, inheritance tax mitigation, intergenerational wealth transfer, trust administration, and cash management. This broad scope is highly valued by clients who want to ensure their wealth is structured tax-efficiently and passed on smoothly to the next generation under the guidance of a single, expert advisory relationship."
          />

          <div className="h-8" />

          <Paragraph
            title="Modernized Fees and Transparency"
            body="In alignment with the FCA's Consumer Duty regulations, St. James's Place introduced a modernized fee structure in August 2025. This updated model significantly improves transparency by clearly separating adviser fees, product charges, and underlying fund management costs. Crucially, SJP abolished early withdrawal exit fees for new investments and introduced a cap on initial advice fees. This transition aligns SJP with modern industry standards, offering new clients a clean, transparent charging framework while maintaining the premium level of personal guidance they are known for."
          />

          <div className="h-8" />

          <Paragraph
            title="Client Security and Peace of Mind"
            body="Client security and satisfaction remain central to SJP's offering. SJP is fully regulated by the FCA and PRA, with client assets securely held by independent custodians and protected under the Financial Services Compensation Scheme (FSCS). Their commitment to service is reflected in a strong 4.5 out of 5 Trustpilot rating, with clients consistently praising the professionalism, accessibility, and friendliness of their advisers. For retirees and wealth-builders seeking peace of mind and structured financial guidance, SJP represents a trusted and highly stable partner."
          />
        </div>

        <div>
          <div className="sticky top-24">
            <MatchmakerCard />

            <div className="h-8" />

            <SJPCard />
          </div>
        </div>
      </div>

      <div className="h-8" />

      <Resources />

      <div className="h-8" />

      <RelatedSpecialists />

      <div className="h-12" />
    </Page>
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
function ChipC({ text }: { text: string }) {
  return (
    <div className="rounded-sm border-0 border-neutral-200 bg-primary/10 px-1.5 py-1">
      <p className="text-xs font-medium whitespace-nowrap text-neutral-900">
        {text}
      </p>
    </div>
  );
}

// function LocationHeadQuaters() {
//   const apiKey: string = "AIzaSyBrz6B9dpe6eDvFL1u60FTogOeqOknozYU";
//   const encodedName: string = encodeURIComponent("St James's Place");
//   const address = `${encodedName}, 1 Tetbury Rd, Cirencester GL7 1FP, United Kingdom`;
//   const encodedAddress: string = encodeURIComponent(address);
//   const mapsUrl: string = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;
//
//   return (
//     <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
//       <iframe
//         src={mapsUrl}
//         referrerPolicy="no-referrer-when-downgrade"
//         allowFullScreen
//         className="h-64 w-full border-none"
//       />
//     </div>
//   );
// }

function ButtonSave() {
  return (
    <button
      type="button"
      className="flex flex-row items-center justify-center gap-0.5 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2"
    >
      <Lucide.Heart className="size-5 stroke-neutral-800" />
      <span className="text-sm font-normal text-neutral-800">Save</span>
    </button>
  );
}

function ButtonShare() {
  return (
    <button
      type="button"
      className="flex size-9.5 items-center justify-center rounded-full border border-neutral-600 bg-white"
    >
      <Lucide.Share className="size-4 stroke-neutral-800" />
      {/* <span className="text-xs font-normal text-neutral-800">Share</span> */}
    </button>
  );
}

function Paragraph({ title, body }: { title: string; body: string }) {
  return (
    <section className="px-6">
      <h3 className="w-min text-lg leading-tight font-semibold tracking-tight whitespace-nowrap text-neutral-800 lg:text-xl">
        {title}
      </h3>

      <div className="h-4" />

      <p className="text-sm leading-relaxed text-neutral-700">{body}</p>
    </section>
  );
}

function MatchmakerCard() {
  return (
    <Wouter.Link href={"/matchmaker"} className="contents">
      <article className="grid grid-cols-[4fr_6fr] gap-6 overflow-hidden rounded-md bg-primary/10 p-4">
        <div className="relative">
          <img
            className="absolute top-0 left-0 size-full -rotate-3 rounded-md object-cover object-center shadow-lg"
            src={`/images/destinations/portugal/portugal.webp`}
          />
        </div>
        <div className="py-2">
          <p className="text-xl leading-none font-bold tracking-tight text-neutral-900">
            Find your <br />
            perfect match
          </p>

          <div className="h-2" />

          <p className="text-sm font-medium text-neutral-700">
            Try our matchmaker and find the perfect destination for you.
          </p>

          <div className="h-4" />

          <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary">
            <Lucide.Play className="size-3.5 fill-accent stroke-neutral-800" />
            <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
              Take quiz
            </span>
          </div>
        </div>
      </article>
    </Wouter.Link>
  );
}

function SJPCard() {
  return (
    <div className="relative">
      <div className="relative w-76 border border-neutral-200 bg-neutral-50 p-6 shadow-xl">
        <h3 className="font-serif text-4xl font-extrabold tracking-tight text-neutral-900">
          Looking for <br />
          financial <br />
          advice?
        </h3>

        <div className="h-4" />

        <p className="w-4/5 text-sm font-normal text-neutral-800">
          Working with a trusted financial adviser will help give you confidence
          that you're making informed decisions and building a financial plan
          that’s as individual as you are.
        </p>

        <div className="h-12" />

        <div>
          <a
            href=""
            target="_blank"
            className="bg-[#3fdcc8] px-6 py-3 text-sm font-semibold"
          >
            One-to-one advice
          </a>
        </div>

        <div className="h-2" />

        <img
          src="/images/st-james-place-man-phone-call.png"
          className="absolute bottom-0 left-3/5 size-64 object-contain object-center"
        />
      </div>

      <img
        src="/images/st-james-place-circle-lines.svg"
        className="absolute top-1/2 left-1/2 -z-10 size-56 -translate-y-1/2"
      />
    </div>
  );
}

function Resources() {
  return (
    <section className="px-6">
      <h3 className="text-lg leading-tight font-semibold tracking-tight text-neutral-800 lg:text-xl">
        Useful Resources & Reviews
      </h3>

      <div className="h-4" />

      <ScrollArea.Root className="">
        <ScrollArea.Viewport className="snap-x snap-mandatory">
          <ScrollArea.Content className="flex gap-4">
            {resources
              .slice(0, 3)
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
                    className="w-76 snap-start lg:w-84"
                  >
                    <article className="flex h-116 flex-col rounded-md border border-neutral-300 bg-white p-2 lg:h-124">
                      <div className="relative h-48 overflow-hidden rounded-sm border border-neutral-200 bg-primary/10">
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
                            src={`/images/${resource.image}.jpg`}
                            className="absolute top-0 left-0 size-full object-cover object-center"
                          />
                        )}
                      </div>

                      <div className="h-2" />

                      <div className="flex grow flex-col px-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-neutral-700 lg:text-sm">
                            {resource.platform}
                          </p>

                          <p className="text-xs font-medium text-neutral-700 lg:text-sm">
                            {formatter.format(new Date(resource.date))}
                          </p>
                        </div>

                        <div className="h-2" />

                        <h4 className="line-clamp-3 text-base leading-tight font-bold tracking-tight text-neutral-900 lg:text-lg">
                          {resource.title}
                        </h4>

                        <div className="h-1" />

                        <div className="flex flex-wrap items-center gap-1">
                          {resource.tags.map((tag) => {
                            return (
                              <React.Fragment key={tag}>
                                <p className="text-xs font-semibold text-neutral-800 capitalize lg:text-sm">
                                  {tag}
                                </p>
                                <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 last:hidden lg:size-2" />
                              </React.Fragment>
                            );
                          })}
                        </div>

                        <div className="h-2" />

                        <p className="line-clamp-4 text-xs leading-relaxed text-neutral-700 lg:text-sm">
                          {resource.description}
                        </p>

                        <div className="h-2" />

                        <div className="grow" />

                        <div className="h-px bg-neutral-300" />

                        <div className="h-4" />

                        <div className="flex items-center gap-1">
                          {resource.platform === "YouTube" ? (
                            <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary lg:px-4">
                              <Lucide.Play className="size-3.5 fill-accent stroke-neutral-800" />
                              <span className="text-xs font-medium whitespace-nowrap text-neutral-900">
                                Watch video
                              </span>
                            </div>
                          ) : (
                            <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-neutral-600 bg-white px-3 py-2 outline outline-primary lg:px-4">
                              <span className="text-xs font-medium whitespace-nowrap text-neutral-900 lg:text-sm">
                                Read more
                              </span>
                              <Lucide.ArrowRight className="size-4 stroke-primary lg:size-4.5" />
                            </div>
                          )}

                          <div className="grow" />

                          <button type="button" className="contents">
                            <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600 lg:size-9">
                              <Lucide.Share2 className="size-4 stroke-neutral-600 lg:size-5" />
                            </div>
                          </button>

                          <button type="button" className="contents">
                            <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600 lg:size-9">
                              <Lucide.Heart className="size-4 stroke-neutral-600 lg:size-5" />
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
    </section>
  );
}

function RelatedSpecialists() {
  return (
    <section className="px-6">
      <h3 className="text-lg leading-tight font-semibold tracking-tight text-neutral-800 lg:text-xl">
        Related Specialists
      </h3>

      <div className="h-4" />

      <ScrollArea.Root className="">
        <ScrollArea.Viewport className="snap-x snap-mandatory">
          <ScrollArea.Content className="flex gap-4">
            {[0].map(() => {
              return (
                <div className="w-76 snap-start lg:w-88">
                  <article className="flex h-114 flex-col overflow-hidden rounded-md bg-primary/10">
                    <div className="relative h-54 overflow-hidden bg-white">
                      <img
                        src="/images/st-james-place-hq.jpg"
                        className="absolute top-0 left-0 size-full object-cover object-center"
                      />

                      <div className="absolute top-0 left-0 flex w-full justify-end gap-0.5 p-2">
                        <button type="button" className="contents">
                          <div className="flex size-8 items-center justify-center rounded-full border border-neutral-800 bg-white lg:size-9">
                            <Lucide.Share2 className="size-4 stroke-neutral-800 lg:size-5" />
                          </div>
                        </button>

                        <button type="button" className="contents">
                          <div className="flex size-8 items-center justify-center rounded-full border border-neutral-800 bg-white lg:size-9">
                            <Lucide.Heart className="size-4 stroke-neutral-800 lg:size-5" />
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="flex grow flex-col p-4">
                      <h4 className="line-clamp-3 text-base leading-tight font-semibold tracking-tight text-neutral-900 lg:text-xl">
                        St James's Place
                      </h4>

                      <div className="h-1" />

                      <div className="flex flex-wrap items-center gap-1">
                        <p className="text-xs font-semibold text-neutral-800 capitalize lg:text-sm">
                          Finance
                        </p>
                        <Lucide.CircleSmall className="size-1.5 fill-neutral-700 stroke-neutral-400 last:hidden lg:size-2" />
                        <p className="text-xs font-semibold text-neutral-800 capitalize lg:text-sm">
                          Wealth Management
                        </p>
                      </div>

                      <div className="h-2" />

                      <p className="line-clamp-4 text-xs leading-relaxed text-neutral-700 lg:text-sm">
                        St. James's Place plc (SJP) is the UK's largest wealth
                        management company, managing over £220 billion in client
                        assets for nearly one million clients. Founded in 1991
                        by Sir Mark Weinberg, Mike Wilson, and Lord Jacob
                        Rothschild, the Gloucestershire-headquartered firm has
                        grown to become a dominant force in the UK's financial
                        advice and wealth management sector. As a FTSE 100
                        company listed on the London Stock Exchange, SJP is
                        widely recognized for its robust corporate foundation,
                        regulatory compliance, and a long-standing reputation
                        for financial stability.
                      </p>

                      <div className="grow" />

                      <div className="flex w-min flex-row items-center justify-center gap-1 rounded-s-full rounded-e-full border border-primary bg-primary px-3 py-2 shadow-md lg:px-4">
                        <span className="text-xs font-medium whitespace-nowrap text-white lg:text-sm">
                          Read more
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </section>
  );
}
