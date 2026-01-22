import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`text-2xl font-bold`;

const blue = tw`text-blue-500`;
const green = tw`text-green-500`;
const red = tw`text-red-500`;
const yellow = tw`text-yellow-500`;
const neutral = tw`text-neutral-500`;

const variants = {
  color: { yellow, blue, green, red, neutral },
} as const;

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = RemoveNullish<Variants>;

export function Grade({ children, color }: React.PropsWithChildren<Props>) {
  return <span className={cn({ color })}>{children}</span>;
}
