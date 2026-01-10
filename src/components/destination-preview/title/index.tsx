import { ChevronRightIcon } from "lucide-react";

export function Title({
  children,
  href,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="flex items-center justify-between">
      <h2>
        <span className="text-base font-medium text-neutral-700">
          {children}
        </span>
      </h2>

      <ChevronRightIcon className="size-5 text-neutral-400" />
    </a>
  );
}
