import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { useUser } from "@/contexts/user";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import * as UserUtils from "@/utils/user";
import type { Resource } from "@/types/resource";
import type { Provider } from "@/types/provider";

export function UserHome() {
  const [user, setUser] = useUser();

  const savedDestinations = user.saved.filter((s) => s.type === "Destination");
  const savedResources = user.saved.filter((s) => s.type === "Resource");
  const savedProviders = user.saved.filter((s) => s.type === "Provider");

  return (
    <div className="flex min-h-svh flex-col bg-neutral-50 text-neutral-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
            Welcome <span className="text-primary">Home</span>
          </h1>
          <p className="mt-2 text-lg text-neutral-500">
            Your personal dashboard for retirement planning.
          </p>
        </header>

        {user.saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-neutral-200 bg-white py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-50">
              <Lucide.BookmarkX className="size-10 text-neutral-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                Your collection is empty
              </h2>
              <p className="mt-1 text-neutral-500">
                Start exploring destinations and save your favorites here.
              </p>
            </div>
            <Wouter.Link href="/explore">
              <div className="cursor-pointer rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-primary active:scale-95">
                Explore Destinations
              </div>
            </Wouter.Link>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {savedDestinations.length > 0 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-800">
                    Saved Destinations
                  </h2>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
                    {savedDestinations.length}
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {savedDestinations.map((s) => (
                    <li key={s.id}>
                      {s.type === "Destination" && (
                        <DestinationCard destination={s.data} />
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {savedResources.length > 0 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-800">
                    Saved Resources
                  </h2>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
                    {savedResources.length}
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {savedResources.map((s) => (
                    <li key={s.id}>
                      {s.type === "Resource" && (
                        <ResourceCard
                          resource={s.data}
                          onRemove={() =>
                            setUser((prev) =>
                              UserUtils.removeSavedItem(prev, s.id),
                            )
                          }
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {savedProviders.length > 0 && (
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-neutral-800">
                    Saved Providers
                  </h2>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
                    {savedProviders.length}
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {savedProviders.map((s) => (
                    <li key={s.id}>
                      {s.type === "Provider" && (
                        <ProviderCard
                          provider={s.data}
                          onRemove={() =>
                            setUser((prev) =>
                              UserUtils.removeSavedItem(prev, s.id),
                            )
                          }
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ResourceCard({
  resource,
  onRemove,
}: {
  resource: Resource;
  onRemove: () => void;
}) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
            {resource.platform}
          </span>
          <Lucide.ExternalLink className="size-3 text-primary" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRemove}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-red-50 hover:text-red-500 active:scale-95"
            aria-label="Remove from saved"
          >
            <Lucide.Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-3"
      >
        <header className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-neutral-700 transition-colors group-hover:text-primary">
            {resource.title}
          </h3>
          <p className="text-xs font-semibold text-neutral-500 capitalize">
            {resource.author}
          </p>
        </header>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {resource.description}
        </p>
      </a>
    </article>
  );
}

function ProviderCard({
  provider,
  onRemove,
}: {
  provider: Provider;
  onRemove: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:border-primary/20">
      <div className="flex items-center justify-between gap-4">
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {new URL(provider.website).hostname}
          <Lucide.ExternalLink className="size-3" />
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={onRemove}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-100 bg-white transition-all hover:bg-red-50 hover:text-red-500 active:scale-95"
            aria-label="Remove from saved"
          >
            <Lucide.Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-neutral-800">{provider.name}</h4>
          {provider.partnered && (
            <Lucide.BadgeCheck className="size-5 fill-primary/10 text-primary" />
          )}
        </div>
        <span className="text-xs font-bold tracking-tighter text-neutral-400 uppercase">
          {provider.category}
        </span>
      </header>

      <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
        {provider.description}
      </p>

      <footer className="mt-auto flex flex-col gap-2 border-t border-neutral-50 pt-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Lucide.Phone className="size-3 shrink-0" />
          <span>{provider.contact}</span>
        </div>
      </footer>
    </article>
  );
}
