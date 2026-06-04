import { Footer } from "@/components/footer";
import { Topbar } from "@/components/topbar";

export function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <section className="">
      <div className="flex min-h-svh flex-col">
        <Topbar />
        {children}
      </div>
      <Footer />
    </section>
  );
}
