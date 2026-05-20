import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { Menu } from "@base-ui/react/menu";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
      <Wouter.Link href="/">
        <div className="text-lg font-bold tracking-tight text-neutral-900">
          Retire<span className="text-primary">Away</span>
        </div>
      </Wouter.Link>

      <div className="flex items-center gap-4 lg:gap-4">
        <Wouter.Link href="/matchmaker">
          <div className="flex items-center gap-1">
            <Lucide.Sparkles className="hidden size-4 stroke-neutral-900 lg:inline" />
            <div className="text-sm leading-none font-bold tracking-tight text-neutral-900">
              Match<span className="text-primary">maker</span>
            </div>
          </div>
        </Wouter.Link>

        {/* menu button */}
        <Menu.Root>
          <Menu.Trigger className="flex cursor-pointer items-center justify-center p-1 outline-none">
            <Lucide.ChartNoAxesGantt className="size-5 stroke-neutral-500" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={16} align="end">
              <Menu.Popup className="animate-in fade-in zoom-in-95 z-50 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-xl duration-200 outline-none">
                <Menu.Item
                  render={<Wouter.Link href="/matchmaker" />}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors outline-none select-none hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900"
                >
                  <Lucide.Sparkles className="size-4" />
                  Matchmaker
                </Menu.Item>
                <Menu.Item
                  render={<Wouter.Link href="/explore" />}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors outline-none select-none hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900"
                >
                  <Lucide.Compass className="size-4" />
                  Explore
                </Menu.Item>
                <Menu.Separator className="my-1 h-px bg-neutral-100" />
                <Menu.Item
                  render={<Wouter.Link href="/login" />}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors outline-none select-none hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900"
                >
                  <Lucide.LogIn className="size-4" />
                  Log In
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </nav>
  );
}
