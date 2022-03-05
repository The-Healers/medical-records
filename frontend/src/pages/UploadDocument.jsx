import { Typography, Layout, Button, Input, Form, Select, message, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React from "react";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export default function UploadDocument() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return (
        <Content style={{ padding: '0 50px', textAlign:"left", margin:"40px auto auto auto", width:"50%"}}>
            <Title level={3} style={{textAlign:"center"}}>Upload Document</Title>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                
                
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the document name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Hospital / Medical location"
                    name="location"
                    rules={[{ required: true, message: 'Please input medical location!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Doctor / Medical Professions"
                    name="contact"
                    rules={[{ required: true, message: 'Please input medical contact!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Access"
                    name="access"
                    rules={[{ required: true, message: 'Please choose access level!' }]}
                >
                    <Select onChange={handleChange}>
                        <Option value="public">Public</Option>
                        <Option value="private">Private</Option>
                        <Option value="restricted">Restricted</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="file"
                    rules={[{ required: true, message: 'Please upload file!' }]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                
                <Form.Item style={{textAlign:"center"}}>
                    <Button type="danger" htmlType="submit">Upload</Button>
                </Form.Item>
            </Form>
        </Content>
    );
}
