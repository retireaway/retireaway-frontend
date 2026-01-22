import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

import { Grade } from "./grade";
import { Text } from "./text";

const base = tw`flex flex-col items-center justify-center gap-1 rounded-xl border-1 border-neutral-100 bg-neutral-50 p-2`;

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

type Props = RemoveNullish<Variants> & { text: string; grade: string };

export function Rating({ color, grade, text }: Props) {
  return (
    <div className={cn({})}>
      <Text color={color}>{text}</Text>
      <Grade color={color}>{grade}</Grade>
    </div>
  );
}
