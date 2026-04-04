import * as Wouter from "wouter";

import { NotFound } from "@/components/not-found";
import { ComparisonProvider } from "@/contexts/comparison";
import { ComparisonBar } from "@/components/comparison-bar";

import { Explore } from "./pages/explore";
import { DestinationProfile } from "./pages/:id";
import { ComparisonPage } from "./pages/compare";
import { Home } from "./pages/home";
import * as Matchmaker from "./pages/matchmaker";

export function App() {
  return (
    <ComparisonProvider>
      <Wouter.Router base="/">
        <Wouter.Switch>
          <Wouter.Route path="/">
            <Home />
          </Wouter.Route>

          <Wouter.Route path="/explore">
            <Explore />
          </Wouter.Route>

          <Wouter.Route path="/matchmaker">
            <Matchmaker.Questionnaire />
          </Wouter.Route>

          <Wouter.Route path="/matchmaker/results">
            <Matchmaker.Results />
          </Wouter.Route>

          <Wouter.Route path="/compare">
            <ComparisonPage />
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
