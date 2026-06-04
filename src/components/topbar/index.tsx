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
      <div className="h-14" />

      <nav className="fixed top-0 left-0 z-1 grid h-14 w-full grid-cols-3 border-b border-neutral-200 bg-white px-6">
        <Wouter.Link href="/" className="contents">
          <div className="flex items-center justify-start">
            <div className="flex items-center">
              <div className="text-lg font-bold tracking-tight text-neutral-900">
                Retire<span className="text-primary">Away</span>
              </div>
            </div>
          </div>
        </Wouter.Link>

        <div></div>

        <div className="flex items-center justify-end gap-4">
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
            <Lucide.Astroid className="size-5 stroke-neutral-600" />
          </Wouter.Link>

          <Dialog.Trigger
            handle={sidebarDialogHandle}
            className="flex items-center justify-center gap-1"
          >
            <Lucide.TextAlignJustify className="size-5 text-neutral-600" />
          </Dialog.Trigger>
        </div>
      </nav>
    </>
  );
}
