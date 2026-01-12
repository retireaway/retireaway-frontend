import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`flex flex-row items-center justify-center gap-1 rounded-s-full px-2 py-1 text-xs font-medium`;

const blue = tw`bg-blue-50 text-blue-600`;
const green = tw`bg-green-50 text-green-600`;
const red = tw`bg-red-50 text-red-600`;
const yellow = tw`bg-yellow-50 text-yellow-600`;

const variants = {
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Title({ children, color }: Props) {
  return (
    <div className={cn({ color })}>
      <span>{children}</span>
    </div>
  );
}
