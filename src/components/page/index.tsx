import { Footer } from "@/components/footer";
import { Topbar } from "@/components/topbar";

export function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <section className="">
      <div className="mx-auto flex min-h-svh max-w-280 flex-col">
        <Topbar />
        {children}
      </div>
      <Footer />
    </section>
  );
}
