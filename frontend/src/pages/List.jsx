import { Typography, Layout, Button, Row, Table} from "antd";
import { LinkOutlined } from '@ant-design/icons';
import React from "react";

const { Content } = Layout;
const { Title } = Typography;

export default function Search() {

    return (
        <Content style={{ padding: '0 50px', textAlign:"left", margin:"40px auto auto auto", width:"75%"}}>
            
            <Row justify="space-between">
                <Title level={3}>Documents</Title>
                <Button type="danger">Add</Button>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
        </Content>
    );
}

const dataSource = [
    {
        key: '1',
        name: 'Dental Records',
        location: 'Hospital 1',
        contact: 'Dr. Adams',
        access: 'Public',
        link: '/',
    },
    {
        key: '2',
        name: 'Allergies',
        location: 'Hospital 2',
        contact: 'Dr. Smith',
        access: 'Private',
        link: '/',
    },
];
  
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Access',
        dataIndex: 'access',
        key: 'access',
    },
    {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        render: text => <a href={text}><LinkOutlined /></a>,
    },
];
