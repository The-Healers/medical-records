import React from "react";
import ReactDOM from "react-dom";
import { Dapp } from "./components/Dapp";

import { App } from "./App"

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <Dapp /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
