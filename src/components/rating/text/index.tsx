import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`text-xs font-semibold text-neutral-400 uppercase`;

const blue = tw``;
const green = tw``;
const red = tw``;
const yellow = tw``;
const neutral = tw``;

const variants = {
  color: { yellow, blue, green, red, neutral },
} as const;

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = RemoveNullish<Variants>;

export function Text({ children }: React.PropsWithChildren<Props>) {
  return <span className={cn({})}>{children}</span>;
}
