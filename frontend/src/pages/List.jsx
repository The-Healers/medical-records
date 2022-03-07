import { Typography, Layout, Button, Row, Table } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMetaMask } from "../providers/MetaMaskProvider";

const { Content } = Layout;
const { Title } = Typography;

const PROXY_URL = "https://ancient-sea-28411.herokuapp.com";

export default function List() {
  const { getDocuments, walletAddress } = useMetaMask();

  const [source, setSource] = useState([]);

  const getFileByKey = (metadataUID) => {
    axios
      .get(`${PROXY_URL}/metadata`, { params: { key: metadataUID } })
      .then((res) => {
        const { name, location, contact, access, docUID } = res.data.data;

        axios
          .get(`${PROXY_URL}/doc`, {
            params: { key: docUID },
            responseType: "blob",
          })
          .then((res) => {
            var blob = new Blob([res.data], { type: "application/pdf" });
            var blobURL = URL.createObjectURL(blob);
            setSource((prev) => [
              ...prev,
              {
                key: docUID,
                name,
                location,
                contact,
                access,
                link: blobURL,
              },
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callGetDoucments = async () => {
    console.log(walletAddress);
    const documents = await getDocuments(walletAddress);
    for (let i = 0; i < documents.length; i++) {
      getFileByKey(documents[i]);
    }
    console.log(documents);
  };

  useEffect(() => {
    if (walletAddress) {
      callGetDoucments();
    }
  }, [walletAddress]);

  return (
    <Content
      style={{
        padding: "0 50px",
        textAlign: "left",
        margin: "40px auto auto auto",
        width: "75%",
      }}
    >
      <Row justify="space-between">
        <Title level={3}>Documents</Title>
        <Link to="/upload">
          <Button type="danger">Add</Button>
        </Link>
      </Row>
      <Table dataSource={source} columns={columns} />
    </Content>
  );
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Access",
    dataIndex: "access",
    key: "access",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer">
        <LinkOutlined />
      </a>
    ),
  },
];
