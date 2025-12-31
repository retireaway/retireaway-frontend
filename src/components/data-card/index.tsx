export function DataCard({ children }: React.PropsWithChildren<{}>) {
  return (
    <article className="flex w-full flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-4">
      {children}
    </article>
  );
}

DataCard.Title = function Title({ children }: { children: string }) {
  return (
    <h3>
      <span className="text-lg font-medium text-neutral-700">{children}</span>
    </h3>
  );
};

DataCard.Subtitle = function Subtitle({ children }: { children: string }) {
  return <p className="text-xs text-neutral-400">{children}</p>;
};

DataCard.Text = function Text({ children }: { children: string }) {
  return <p className="text-sm text-neutral-500">{children}</p>;
};

DataCard.Context = function Context({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-between">{children}</div>
  );
};
