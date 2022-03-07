import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { MetaMaskProvider } from "./providers/MetaMaskProvider";
import { AppSwitch } from "./AppSwitch";
import "./index.css";

render(
  <BrowserRouter>
    <React.StrictMode>
      <MetaMaskProvider>
        <AppSwitch />
      </MetaMaskProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
