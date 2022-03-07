import { Typography, Layout, Button, Input, Form, Select, message, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React, { useState }  from "react";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const PROXY_URL = 'https://ancient-sea-28411.herokuapp.com/upload';

export default function UploadDocument() {

    const [file, setFile] = useState(null)
    const [fileList, setFileList] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uid, setUid] = useState();

    const handleUpload = () => {
        uploadFile();
        if (isUploaded) {
            // Smart contract logic (store uid in contract)
        }
    }

    const uploadFile = () => {
        if (file) {
            const formData = new FormData()
            formData.append('docFile', file)
            setIsUploading(true)
            axios.post(PROXY_URL, formData)
                .then((res) => {
                    setFile(null)
                    setFileList(_ => [])
                    setUid(res.data.data.uid)
                    setIsUploaded(true)
                    message.success('upload successfully.');
                    console.log(res.data.data.uid)
                })
                .catch((err) => {
                    console.log(err)
                    message.error('upload failed.');
                })
                .finally(() => {
                    setIsUploading(false);
                });
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const props = {
        onRemove: _ => {
            setFile(null)
            setFileList(_ => [])
        },
        beforeUpload: file => {
            console.log(file.type)
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                message.error(`${file.name} is not a pdf file`);
                return true;
            } else {
                setFile(file)
                setFileList(_ => [file])
                return false;
            }
        },
        fileList
    };

    return (
        <Content style={{ padding: '0 50px', textAlign:"left", margin:"auto", width:"50%"}}>
            <Title level={3} style={{textAlign:"center"}}>Upload Document</Title>
            <Form
                layout="vertical"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ 
                        // required: true, 
                        message: 'Please input the document name!' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Hospital / Medical location"
                    name="location"
                    rules={[{ 
                        // required: true, 
                        message: 'Please input medical location!' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Doctor / Medical Professions"
                    name="contact"
                    rules={[{ 
                        // required: true, 
                        message: 'Please input medical contact!' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Access"
                    name="access"
                    rules={[{ 
                        // required: true, 
                        message: 'Please choose access level!' 
                    }]}
                >
                    <Select onChange={handleChange}>
                        <Option value="public">Public</Option>
                        <Option value="private">Private</Option>
                        <Option value="restricted">Restricted</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="file"
                    rules={[{ 
                        required: true, 
                        message: 'Please upload file!' 
                    }]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                
                <Form.Item style={{textAlign:"center"}}>
                    <Button type="danger" htmlType="submit" onClick={handleUpload}>Upload</Button>
                </Form.Item>
            </Form>
        </Content>
    );
}
