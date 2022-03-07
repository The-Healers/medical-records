import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  walletAddress: "",
  isWalletConnected: false,
  error: "",
  connectWallet: () => {},
};

export const MetaMaskContext = React.createContext(initialState);

export const useMetaMask = () => useContext(MetaMaskContext);

export const MetaMaskProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const chainId = {
    localhost: "0x539",
    rinkeby: "0x4",
    mainnet: "0x1",
  };
  const currentChain = chainId["localhost"];

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const connectedChain = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (connectedChain === currentChain) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts && Array.isArray(accounts)) {
            const account = accounts[0];
            setIsWalletConnected(true);
            setWalletAddress(account);
            console.log("Account connected: ", account);
          }
        } else {
          setError(
            "Please connect to the correct network. Close and try again."
          );
        }
      } else {
        setError("Please install a MetaMask wallet.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isWalletConnected) {
      console.log("working?");
      navigate("./view");
    }
  }, [isWalletConnected]);

  return (
    <MetaMaskContext.Provider
      value={{ walletAddress, isWalletConnected, connectWallet, error }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};
