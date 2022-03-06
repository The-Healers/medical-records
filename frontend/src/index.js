import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"
import Landing from "./pages/Landing"
import Search from "./pages/Search";
import List from "./pages/List";
import UploadDocument from "./pages/UploadDocument";

import './index.css';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Landing />} />
          <Route path="search" element={<Search />} />
          <Route path="view" element={<List />} />
          <Route path="upload" element={<UploadDocument />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
