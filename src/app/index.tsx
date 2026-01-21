import * as Wouter from "wouter";
import { Home } from "./pages/home";

export function App() {
  return (
    <Wouter.Router base="/">
      <Wouter.Switch>
        <Wouter.Route path="/">
          <Home />
        </Wouter.Route>
      </Wouter.Switch>
    </Wouter.Router>
  );
}
