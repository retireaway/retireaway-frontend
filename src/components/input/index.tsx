import { tw } from "@/utils/tailwind";

const base = tw`has-focus:outline-primary flex justify-center gap-2 rounded-xl border-1 border-neutral-200 outline-2 outline-transparent transition has-focus:border-neutral-300`;
const red = tw`has-user-invalid:border-red-200 has-user-invalid:outline-transparent has-user-invalid:has-focus:outline-red-600`;

type InputProps = {} & React.ComponentProps<"input">;

export function Input({
  children,
  ...rest
}: React.PropsWithChildren<InputProps>) {
  return (
    <div className={`${base} ${red}`}>
      <input
        className="w-0 grow border-none p-4 text-base text-neutral-600 outline-none placeholder:text-neutral-400"
        {...rest}
      />
      {children && (
        <div className="flex items-center justify-center px-4">{children}</div>
      )}
    </div>
  );
}
