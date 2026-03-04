import * as Wouter from "wouter";

import { NotFound } from "@/components/not-found";
import { ComparisonProvider } from "@/contexts/comparison";
import { ComparisonBar } from "@/components/comparison-bar";

import { Index } from "./pages";
import { DestinationProfile } from "./pages/:id";

export function App() {
  return (
    <ComparisonProvider>
      <Wouter.Router base="/">
        <Wouter.Switch>
          <Wouter.Route path="/">
            <Index />
          </Wouter.Route>

          <Wouter.Route path="/:id/:tab">
            <DestinationProfile />
          </Wouter.Route>

          <Wouter.Route>
            <NotFound />
          </Wouter.Route>
        </Wouter.Switch>
      </Wouter.Router>

      <ComparisonBar />
    </ComparisonProvider>
  );
}
