import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import List from "./pages/List";
import UploadDocument from "./pages/UploadDocument";

import "./index.css";
import { MetaMaskProvider } from "./providers/MetaMaskProvider";

render(
  <BrowserRouter>
    <React.StrictMode>
      <MetaMaskProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="search" element={<Search />} />
            <Route path="view" element={<List />} />
            <Route path="upload" element={<UploadDocument />} />
          </Route>
        </Routes>
      </MetaMaskProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
