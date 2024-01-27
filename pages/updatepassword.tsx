import { Button, Form, Input, Space, message } from "antd";
import Header from "components/layout/header/Header";
import Link from "next/link";
import React from 'react';


export default function UpdatePassword() {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const accessToken = localStorage.getItem('access_token');

      const response = await fetch('http://47.128.244.84:8001/user/update/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Cập nhật thành công');
      } else {
        message.error(`Error updating account: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };
  return (


    <div>
      <Header></Header>
      <div className="bg-[#F5F5F5] min-h-screen w-full flex justify-center">
        <div className="h-screen p-6 mt-6 w-1/2 bg-white rounded-2xl">
          <div className="text-zinc-800 text-[32px] font-semibold mb-8">Thiết lập tài khoản</div>
          <Link href="/profile">
            <Button className="mb-8">Hồ sơ tài khoản</Button>
          </Link>
          <div>
            <Form
              form={form}
              layout="vertical"
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item className='flex justify-end'>
                <Space>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890ff', color: '#fff' }}>
                    Lưu
                  </Button>
                  <Button htmlType="button" onClick={onReset} >
                    Huỷ
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
