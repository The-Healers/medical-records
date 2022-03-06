import { PageHeader, Typography, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Connect } from "../components/Connect";
import { useMetaMask } from "../providers/MetaMaskProvider";

const { Title } = Typography;

export default function Header() {
  const {isWalletConnected, walletAddress} = useMetaMask();

  const options = () => {
    if (!isWalletConnected) {
      return [
        <Link to="/search"  key="search"><Button>Search</Button></Link>,
        <Link to="/view"  key="view"><Button>View</Button></Link>,
        <Link to="/upload"  key="upload"><Button>Upload</Button></Link>,
        <Connect text={'Connect'} />
      ]
    }

    return [
      <Button key="address" type="dashed" disabled>{walletAddress}</Button>
    ]
  }
  return (
    <PageHeader 
        title={<Link to="/"><Title level={3}><span role='img' aria-label='hopital emoji'>🏥</span> Healers</Title></Link>}
        style={{ cursor: "pointer" }} 
        extra={[options()]}
    />
  );
}
