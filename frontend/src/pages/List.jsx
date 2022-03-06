import { Typography, Layout, Button, Row, Table} from "antd";
import { LinkOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const PROXY_URL = 'https://ancient-sea-28411.herokuapp.com/';

export default function Search() {

    const [source, setSource] = useState([]);
    
    const getFileByKey = (index, pdfFile) => {
        axios.get(PROXY_URL, { params: { key: pdfFile}, responseType:"blob"})
            .then(res => {
                var blob = new Blob([res.data], {type: 'application/pdf'});
                var blobURL = URL.createObjectURL(blob);
                setSource(prev => [...prev, {
                    key: index,
                    name: pdfFile,
                    location: `Hospital ${index}`,
                    contact: 'Dr. Adams',
                    access: 'Public',
                    link: blobURL,
                }])
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        // Example way to use, replace with smart contract's patient list of document ids
        const test_data = ["ape.pdf", "ape2.pdf", "ape3.pdf"]
        for (let i = 0; i < test_data.length; i++) {
            getFileByKey(i, test_data[i]);
        }
    }, [])

    return (
        <Content style={{ padding: '0 50px', textAlign:"left", margin:"40px auto auto auto", width:"75%"}}>
            
            <Row justify="space-between">
                <Title level={3}>Documents</Title>
                <Button type="danger">Add</Button>
            </Row>
            <Table dataSource={source} columns={columns} />
        </Content>
    );
}
  
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
        render: text => <a href={text} target="_blank"><LinkOutlined /></a>,
    },
];
