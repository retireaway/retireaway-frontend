import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

import { Text } from "./text";

const base = tw`flex flex-row items-center justify-center gap-1 rounded-s-full px-2 py-1`;

const blue = tw`bg-blue-50`;
const green = tw`bg-green-50`;
const red = tw`bg-red-50`;
const yellow = tw`bg-yellow-50`;

const variants = {
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Left({ children, color }: Props) {
  return <div className={cn({ color })}>{children}</div>;
}

Left.Text = Text;
