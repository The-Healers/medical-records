import { Layout, Typography } from "antd";
import React from "react";
import { Connect } from "../components/Connect";

const { Content } = Layout;
const { Title } = Typography;

export default function Landing() {
  return (
    <Content style={{ padding: '0 50px', textAlign:"center", margin:"60px auto auto auto", width:"60%"}}>
      <Title style={{fontSize:"64px"}}>Secure, accessible and personal health record storage</Title>
      <Connect text={"Connect Wallet"} />
    </Content>
  );
}
