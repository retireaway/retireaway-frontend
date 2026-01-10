export function Slider({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-scroll">
      {children}
    </ul>
  );
}

Slider.Item = function Item({ children }: React.PropsWithChildren<{}>) {
  return <li className="snap-start">{children}</li>;
};
