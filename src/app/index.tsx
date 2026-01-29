import * as Wouter from "wouter";

import { Home } from "./pages/home";
import { DestinationProfile } from "./pages/:id";
import { NotFound } from "@/components/not-found";

export function App() {
  return (
    <Wouter.Router base="/">
      <Wouter.Switch>
        <Wouter.Route path="/">
          <Home />
        </Wouter.Route>

        <Wouter.Route path="/:id/:tab">
          <DestinationProfile />
        </Wouter.Route>

        <Wouter.Route>
          <NotFound />
        </Wouter.Route>
      </Wouter.Switch>
    </Wouter.Router>
  );
}
