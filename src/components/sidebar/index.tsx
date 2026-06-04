import { Dialog } from "@base-ui/react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";

export const sidebarDialogHandle = Dialog.createHandle();

export default function SidebarDialog() {
  return (
    <Dialog.Root handle={sidebarDialogHandle}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-2 h-dvh bg-black/30 backdrop-blur-xs">
          <Dialog.Popup className="fixed flex h-full w-8/10 flex-col bg-white">
            <Dialog.Close className="flex w-full justify-end p-4">
              <Lucide.X className="size-5 stroke-neutral-800 stroke-3" />
            </Dialog.Close>

            <Wouter.Link href="#">
              <Dialog.Close className="contents">
                <Item icon={Lucide.UserRound} title="My Account" />
              </Dialog.Close>
            </Wouter.Link>

            <div className="h-3" />
            <div className="mx-6 h-px bg-neutral-200" />
            <div className="h-3" />

            <Wouter.Link href="/home">
              <Dialog.Close className="contents">
                <Item icon={Lucide.Home} title="Home" />
              </Dialog.Close>
            </Wouter.Link>

            <Wouter.Link href="/explore">
              <Dialog.Close className="contents">
                <Item icon={Lucide.Telescope} title="Explore" />
              </Dialog.Close>
            </Wouter.Link>

            <Wouter.Link href="/matchmaker">
              <Dialog.Close className="contents">
                <Item icon={Lucide.Astroid} title="Matchmaker" />
              </Dialog.Close>
            </Wouter.Link>

            <Wouter.Link href="/compare">
              <Dialog.Close className="contents">
                <Item icon={Lucide.GitCompareArrows} title="Compare" />
              </Dialog.Close>
            </Wouter.Link>

            <div className="h-3" />
            <div className="mx-6 h-px bg-neutral-200" />
            <div className="h-3" />
          </Dialog.Popup>
        </Dialog.Backdrop>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Item({
  icon: Icon,
  iconOther: IconOther,
  title,
}: {
  icon: Lucide.LucideIcon;
  iconOther?: Lucide.LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center justify-start gap-4 px-6 py-4">
      <div className="">
        <Icon className="size-4.5 stroke-neutral-700" />
      </div>
      <p className="text-sm leading-none font-medium tracking-tight text-neutral-800">
        {title}
      </p>
      <div className="grow" />
      {IconOther && (
        <div className="">
          <IconOther className="size-4.5 stroke-neutral-700" />
        </div>
      )}
    </div>
  );
}
