import * as Wouter from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

import { NotFound } from "@/components/not-found";
import { ComparisonProvider } from "@/contexts/comparison";
import { MatchmakerProvider } from "@/contexts/matchmaker";
import { UserProvider } from "@/contexts/user";
import { ComparisonBar } from "@/components/comparison-bar";

import { Explore } from "./pages/explore";
import { DestinationProfile } from "./pages/:id";
import { ComparisonPage } from "./pages/compare";
import { Home } from "./pages/home";
import * as Matchmaker from "./pages/matchmaker";
import { Discover } from "./pages/discover";
import { LoginPage, SignupPage } from "./pages/auth";

export function App() {
  return (
    <UserProvider>
      <ComparisonProvider>
        <MatchmakerProvider>
          <Wouter.Router base="/" hook={useHashLocation}>
            <Wouter.Switch>
            <Wouter.Route path="/">
              <Home />
            </Wouter.Route>

            <Wouter.Route path="/login">
              <LoginPage />
            </Wouter.Route>

            <Wouter.Route path="/signup">
              <SignupPage />
            </Wouter.Route>

            <Wouter.Route path="/explore">
              <Explore />
            </Wouter.Route>

            <Wouter.Route path="/discover">
              <Discover />
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

          <ComparisonBar />
        </Wouter.Router>
      </MatchmakerProvider>
    </ComparisonProvider>
    </UserProvider>
  );
}
