import * as Lucide from "lucide-react";

import { Page } from "@/components/page";

export function StJamesPlace() {
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

      <div className="grid h-400 grid-cols-1 gap-8 lg:grid-cols-[70fr_30fr]">
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
        </div>

        <div>
          <nav className="">
            {/* <h4 className="text-sm font-semibold text-neutral-800 lg:text-base"> */}
            {/*   Table of contents */}
            {/* </h4> */}

            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-base font-medium text-neutral-800">
                  Overview
                </a>
              </li>

              <li>
                <a href="#" className="text-base font-normal text-neutral-500">
                  Services
                </a>
              </li>

              <li>
                <a href="#" className="text-base font-normal text-neutral-500">
                  Pros & Cons
                </a>
              </li>

              <li>
                <a href="#" className="text-base font-normal text-neutral-500">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#" className="text-base font-normal text-neutral-500">
                  Alternatives
                </a>
              </li>
            </ul>
          </nav>

          <div className="h-12" />

          <div className="sticky top-24">
            <div className="relative border border-neutral-200 bg-neutral-50 p-6 shadow-xl">
              <h3 className="font-serif text-4xl font-extrabold tracking-tight text-neutral-900">
                Looking for <br />
                financial <br />
                advice?
              </h3>

              <div className="h-4" />

              <p className="w-4/5 text-base font-normal text-neutral-800">
                Working with a trusted financial adviser will help give you
                confidence that you're making informed decisions and building a
                financial plan that’s as individual as you are.
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
              className="absolute top-1/2 left-1/2 -z-10 size-64 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="h-12" />
      </div>
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
      <Lucide.Heart className="size-5 fill-red-500 stroke-neutral-800" />
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
