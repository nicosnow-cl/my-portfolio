import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import "./style.css";
import { Home } from "./pages/Home";
import { Navbar } from "./components/common/Navbar";
import { NotFound } from "./pages/_404.js";

export function App() {
  return (
    <LocationProvider>
      <Navbar />

      <main className="flex-1">
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
