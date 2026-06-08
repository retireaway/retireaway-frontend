import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import { Dialog } from "@base-ui/react/dialog";
import { sidebarDialogHandle } from "@/components/sidebar";
import { useComparison } from "@/contexts/comparison";

type TopbarProps = {};
export function Topbar({}: TopbarProps) {
  const compare = useComparison();

  return (
    <>
      <div className="h-14 lg:h-16" />

      <nav className="_bg-[#f2f7f6] fixed top-0 left-0 z-1 h-14 w-full border-b border-neutral-200 bg-white lg:h-16">
        <div className="grid h-full max-w-280 grid-cols-[min-content_auto_min-content] gap-8 px-6 lg:mx-auto">
          <Wouter.Link href="/" className="contents">
            <div className="flex items-center justify-start">
              <div className="lg:gap-0.i flex items-center gap-0.5">
                <Lucide.Bird className="size-5 stroke-neutral-900 lg:size-6.5" />
                <div className="text-lg leading-none font-bold tracking-tight text-neutral-900 lg:text-2xl">
                  Retire<span className="text-primary">Away</span>
                </div>
              </div>
            </div>
          </Wouter.Link>

          <div className="flex items-center">
            <div className="hidden h-10 w-full items-center gap-2 rounded-s-full rounded-e-full border border-neutral-500 bg-white px-4 shadow-sm lg:flex">
              <Lucide.Search className="size-5 text-neutral-900" />
              <span className="text-sm text-neutral-500">Search</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 lg:hidden">
            {0 < compare.selectedDestinations.length && (
              <button
                type="button"
                onClick={() => {
                  console.log("open compare modal");
                }}
              >
                <div className="relative rounded-full bg-primary p-1.5">
                  <Lucide.GitCompareArrows className="size-5 stroke-white" />
                  <span className="text-xxs absolute top-0 right-0 flex size-4 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full border border-primary bg-white font-bold text-primary">
                    {compare.selectedDestinations.length}
                  </span>
                </div>
              </button>
            )}

            <Wouter.Link href="/matchmaker">
              <Lucide.Sparkles className="size-5 stroke-neutral-900" />
            </Wouter.Link>

            <Dialog.Trigger
              handle={sidebarDialogHandle}
              className="flex items-center justify-center gap-1 lg:hidden"
            >
              <Lucide.TextAlignJustify className="size-5 text-neutral-900" />
            </Dialog.Trigger>
          </div>

          <div className="hidden items-center justify-end gap-8 lg:flex">
            <div className="flex items-center gap-1">
              <Lucide.Birdhouse className="size-4 stroke-neutral-900" />
              <span className="text-sm leading-none font-semibold tracking-tight text-neutral-900">
                Home
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Lucide.Telescope className="size-4 stroke-neutral-900" />
              <span className="text-sm leading-none font-semibold tracking-tight text-neutral-900">
                Explore
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Lucide.GitCompareArrows className="size-4 stroke-neutral-900" />
              <span className="text-sm leading-none font-semibold tracking-tight text-neutral-900">
                Compare
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Lucide.Sparkles className="size-4 stroke-neutral-900" />
              <span className="text-sm leading-none font-semibold tracking-tight text-neutral-900">
                Match<span className="text-primary">maker</span>
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-sm border border-neutral-400 bg-neutral-100 p-1">
              <Lucide.Wallet className="size-3.5 stroke-neutral-900" />
              <span className="text-xs leading-none font-semibold tracking-tight text-neutral-900">
                USD
              </span>
            </div>

            <div className="flex size-8 items-center justify-center rounded-full border border-neutral-600 bg-white shadow-md">
              <Lucide.UserRound className="size-4 stroke-neutral-900" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
