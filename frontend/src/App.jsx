import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
