import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import DocumentContractJSON from "../contracts/Documents.json";

const initialState = {
  walletAddress: "",
  isWalletConnected: false,
  error: "",
  connectWallet: () => {},
  getDocuments: () => {},
  uploadDocuments: () => {},
};

export const MetaMaskContext = React.createContext(initialState);

export const useMetaMask = () => useContext(MetaMaskContext);

export const MetaMaskProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const environment = "development";

  const chainId = {
    localhost: "0x7a69",
    rinkeby: "0x4",
    mainnet: "0x1",
    mumbai: "80001",
  };

  let currentChain;
  let address;
  switch (environment) {
    case "development":
      currentChain = chainId["localhost"];
      address = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
      break;
    case "test":
      currentChain = chainId["rinkeby"];
      break;
    case "mumbai":
      currentChain = chainId["mumbai"];
      address = "0x7a69";
      break;
    default:
      currentChain = chainId["mainnet"];
      break;
  }

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const connectedChain = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("trying to connect", connectedChain);
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

  const provideDocumentContract = () => {
    try {
      const ethereum = window.ethereum;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(address, DocumentContractJSON.abi, signer);
      }
    } catch (error) {
      console.log(error);
      setError("Something's wrong... please try again.");
    }
  };

  const getDocuments = async (walletAddress) => {
    const DocumentContract = provideDocumentContract();

    const documents = await DocumentContract.get(walletAddress);

    return documents;
  };

  const uploadDocuments = async (key, walletAddress) => {
    const DocumentContract = provideDocumentContract();

    await DocumentContract.update(key, walletAddress);
  };

  useEffect(() => {
    if (isWalletConnected) {
      navigate("./view");
    }
  }, [isWalletConnected]);

  return (
    <MetaMaskContext.Provider
      value={{
        walletAddress,
        isWalletConnected,
        connectWallet,
        error,
        getDocuments,
        uploadDocuments,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};
