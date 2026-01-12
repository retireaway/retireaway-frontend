import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

import { Left } from "./left";
import { Right } from "./right";

const base = tw`flex flex-row rounded-full border-1`;

const blue = tw`border-blue-100`;
const green = tw`border-green-100`;
const red = tw`border-red-100`;
const yellow = tw`border-yellow-100`;

const variants = {
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function ChipPlus({ children, color }: Props) {
  return <div className={cn({ color })}>{children}</div>;
}

ChipPlus.Left = Left;
ChipPlus.Right = Right;
