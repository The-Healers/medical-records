import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import List from "./pages/List";
import UploadDocument from "./pages/UploadDocument";
import { useMetaMask } from './providers/MetaMaskProvider';

export const AppSwitch = () => {
    return (
        <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          {/* <Route path="search" element={<RequireWallet><Search /></RequireWallet>} /> */}
          <Route path="view" element={<RequireWallet><List /></RequireWallet>} />
          <Route path="upload" element={<RequireWallet><UploadDocument /></RequireWallet>} />
        </Route>
      </Routes>
    )
}

const RequireWallet = ({ children }) => {
    const { isWalletConnected } = useMetaMask();
    return isWalletConnected ? children : <Navigate to="/" />;
  };