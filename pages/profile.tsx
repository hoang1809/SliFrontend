import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, message, Input, Form } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { UserProfile } from 'models/model';
import Header from 'components/layout/header/Header';
import Link from 'next/link';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Profile: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const profileUrl = 'http://47.128.244.84:8001/auth/profile';

                const response = await fetch(profileUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
                }

                const userProfile: UserProfile = await response.json();

                form.setFieldsValue({
                    name: userProfile.name,
                    email: userProfile.email,
                    phoneNumber: userProfile.phoneNumber,
                });



                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: userProfile.avatar ? `http://47.128.244.84:8001/user/uploaded/${userProfile.avatar}` : '/assets/icons/blank.png'
                    },
                ]);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        // Limit the fileList to at most one item
        const newFileListLimited = newFileList.slice(-1);
        setFileList(newFileListLimited);
    };

    const handleSave = async () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            message.error('Access token is missing.');
            return;
        }

        try {
            const apiUrl = 'http://47.128.244.84:8001/user/update-account';

            // Assuming you want to send the first file in the list (if available)
            const file = fileList[0];

            if (file) {
                const formData = new FormData();
                formData.append('avatar', file.originFileObj as File);

                await fetch(apiUrl, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                message.success('Cập nhật thành công');
            } else {
                message.warning('Bạn chưa chọn ảnh');
            }
        } catch (error) {
            console.error('Error updating account:', error);
            message.error('Failed to update account. Please try again.');
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish = async (values: any) => {
        try {
            const accessToken = localStorage.getItem('access_token');

            const response = await fetch('http://47.128.244.84:8001/user/update-account', {
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

    const handleCancelbutton = () => {
        form.resetFields();
    };

    return (
        <div>
            <Header></Header>
            <div className="bg-[#F5F5F5] min-h-screen w-full flex justify-center">
                <div className="h-screen p-6 mt-6 w-1/2 bg-white rounded-2xl">
                    <div className="text-zinc-800 text-[32px] font-semibold">Thiết lập tài khoản</div>
                    <Link href="/updatepassword">
                        <Button className="my-8">Cài đặt mật khẩu</Button>
                    </Link>
                    <div className='flex-col justify-start mb-8'>
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Button type="primary" style={{ backgroundColor: '#1890ff', color: '#fff' }} className='ml-4' onClick={handleSave}>
                            Lưu ảnh
                        </Button>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                    <div>
                        <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{
                            name: form.getFieldValue('name'),
                            email: form.getFieldValue('email'),
                            phoneNumber: form.getFieldValue('phoneNumber'),
                        }} >
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                            >
                                <Input required />
                            </Form.Item>

                            <Form.Item
                                name="phoneNumber"
                                label="Số điện thoại"
                                rules={[{ pattern: /^\d{9,11}$/, message: 'Vui lòng điền số điện thoại hợp lệ' }]}
                            >
                                <Input required />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ pattern: /^\S+@\S+\.\S+$/, type: 'email', message: 'Vui lòng điền địa chỉ email hợp lệ' }]}
                            >
                                <Input required />
                            </Form.Item>

                            <Form.Item className='flex justify-end'>
                                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1890ff', color: '#fff' }}>
                                    Lưu
                                </Button>
                                <Button type="default" onClick={handleCancelbutton} style={{ marginLeft: 8 }}>
                                    Huỷ
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
