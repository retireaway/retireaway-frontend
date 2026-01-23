type Props = { text: string; grade: string };

export function Rating({ grade, text }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl">
      <span className="text-xs font-medium text-neutral-400 uppercase">
        {text}
      </span>
      <span className="text-2xl font-bold text-neutral-600">{grade}</span>
    </div>
  );
}
