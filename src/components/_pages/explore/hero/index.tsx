export function Hero() {
  return (
    <section
      id="hero"
      className="flex h-80 flex-col items-center justify-center gap-8 bg-neutral-400 bg-[url(/images/bg-hero.jpg)] bg-cover bg-center px-4 py-6 pt-12 bg-blend-multiply"
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-center text-4xl font-semibold text-white capitalize">
          Retire Where <br />
          You'll Live <br />
          Longest
        </h1>
        <p className="text-center text-base text-white">
          Compare destinations by what matters for your longevity.
          <br className="hidden md:block" />
          Connect with trusted experts to make it happen
        </p>
      </header>
    </section>
  );
}
