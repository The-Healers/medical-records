import { Typography, Layout, Button, Input, Space} from "antd";
import React from "react";

const { Content } = Layout;
const { Title } = Typography;

export default function Search() {

    return (
        <Content style={{ padding: '0 50px', textAlign:"left", margin:"10% auto auto auto", width:"60%"}}>
            <Title level={3}>Search Patient</Title>
            <Space direction="vertical" style={{width:"100%"}}>
                <Input placeholder="Enter ens address"/>
                <Button type="danger">Search</Button>
            </Space>
        </Content>
    );
}
