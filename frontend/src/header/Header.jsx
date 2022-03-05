import { PageHeader, Typography, Button } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  const options = () => {
    if (!isConnected) {
      return [
        <Button key="about">About</Button>,
        <Button key="community">Community</Button>,
        <Button key="team">Team</Button>,
        <Button key="connect" type="danger">Connect</Button>
      ]
    }

    return [
      <Button key="address" type="dashed" disabled>0x...</Button>
    ]
  }
  return (
    <PageHeader 
        title={<Title level={3}>🏥 Healers</Title>}
        style={{ cursor: "pointer" }} 
        extra={[options()]}
    />
  );
}
