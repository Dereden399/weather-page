import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { StateProvider, reducer } from "./state";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StateProvider reducer={reducer}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StateProvider>
);
