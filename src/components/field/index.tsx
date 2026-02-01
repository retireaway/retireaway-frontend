import type { ComponentProps, PropsWithChildren } from "react";

type RootProps = {} & ComponentProps<"div">;

export function Root({
  children,
  className,
  ...props
}: PropsWithChildren<RootProps>) {
  return (
    <div {...props} className={`flex flex-col gap-2 ${className}`}>
      {children}
    </div>
  );
}

type LabelProps = {} & ComponentProps<"label">;

export function Label({ children, htmlFor, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center justify-start"
      {...props}
    >
      <span className="font-sora text-sm font-medium text-neutral-600 capitalize">
        {children}
      </span>
    </label>
  );
}
