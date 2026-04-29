import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex grow flex-col items-center justify-center p-4">
        <div className="mb-24 w-full max-w-md p-6">
          <h1 className="my-6 flex flex-col gap-2 text-left">
            <div className="text-2xl font-bold tracking-tight text-neutral-800">
              Welcome back
            </div>
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-neutral-800"
              >
                Email address
              </label>
              <div className="relative">
                <Lucide.Mail className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-neutral-400 bg-neutral-50 py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-neutral-800"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lucide.Lock className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-neutral-400 bg-neutral-50 py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-s-full rounded-e-full bg-black py-3.5 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-95"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 flex flex-row items-center gap-4">
            <div className="h-px grow bg-neutral-200" />
            <p className="text-center text-sm font-normal text-neutral-600">
              Don't have an account?
            </p>

            <div className="h-px grow bg-neutral-200" />
          </div>

          <p className="mt-4 text-center text-sm font-medium text-neutral-800">
            <Wouter.Link
              href="/signup"
              className="mr-1 font-bold text-primary underline"
            >
              Join
            </Wouter.Link>
            to unlock the best of RetireAway
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Navbar />
      <main className="flex grow flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-6">
          <h1 className="my-6 flex flex-col gap-2 text-left">
            <div className="text-left text-2xl font-bold tracking-tight text-neutral-800">
              Create account
            </div>
          </h1>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-neutral-800"
              >
                Full name
              </label>
              <div className="relative">
                <Lucide.User className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full rounded-md border border-neutral-400 bg-neutral-50 py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-neutral-800"
              >
                Email address
              </label>
              <div className="relative">
                <Lucide.Mail className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-neutral-400 bg-neutral-50 py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-neutral-800"
              >
                Password
              </label>
              <div className="relative">
                <Lucide.Lock className="absolute top-1/2 left-3 size-4.5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-neutral-400 bg-neutral-50 py-3 pr-4 pl-10 text-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                  required
                />
              </div>
              <p className="text-[10px] text-neutral-400">
                Must be at least 8 characters long
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-s-full rounded-e-full bg-black py-3.5 text-sm font-bold text-white transition-all hover:bg-neutral-800 active:scale-95"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 flex flex-row items-center gap-4">
            <div className="h-px grow bg-neutral-200" />
            <p className="text-center text-sm font-normal text-neutral-600">
              Already have an account?
            </p>

            <div className="h-px grow bg-neutral-200" />
          </div>

          <p className="mt-4 text-center text-sm font-medium text-neutral-800">
            <Wouter.Link
              href="/login"
              className="mr-1 font-bold text-primary underline"
            >
              Log In
            </Wouter.Link>
            to return to RetireAway
          </p>

          <p className="mt-8 text-center text-[10px] leading-relaxed text-neutral-400">
            By creating an account, you agree to our <br />
            <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
