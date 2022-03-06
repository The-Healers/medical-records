import { PageHeader, Typography, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  const options = () => {
    if (!isConnected) {
      return [
        <Link to="/search"  key="search"><Button>Search</Button></Link>,
        <Link to="/view"  key="view"><Button>View</Button></Link>,
        <Link to="/upload"  key="upload"><Button>Upload</Button></Link>,
        <Button key="connect" type="danger">Connect</Button>
      ]
    }

    return [
      <Button key="address" type="dashed" disabled>0x...</Button>
    ]
  }
  return (
    <PageHeader 
        title={<Link to="/"><Title level={3}>🏥 Healers</Title></Link>}
        style={{ cursor: "pointer" }} 
        extra={[options()]}
    />
  );
}
