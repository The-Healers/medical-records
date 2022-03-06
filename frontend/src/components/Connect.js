import React from "react";
import { Button } from "antd";
import { useMetaMask } from "../providers/MetaMaskProvider";

export const Connect = ({ text }) => {
  const { connectWallet } = useMetaMask();
  return (
    <Button type="danger" onClick={connectWallet}>
      {text}
    </Button>
  );
};
