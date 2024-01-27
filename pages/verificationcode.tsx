import logo from 'public/assets/icons/logo.svg';
import Image from 'next/image';
import TempalteLogin from 'components/templates/login';
import { Button, Form, Input, message, } from 'antd';
import nameIcon from 'public/assets/icons/email.svg'
import { InputCustom } from 'components/common/input';
import ButtonCustom from 'components/common/button';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter()

    const onFinish = async (values: any) => {
        try {
            const otp = values.otp;
            const email = getEmailFromLocalStorage(); // Get the stored email from localStorage

            const response = await fetch('http://47.128.244.84:8001/auth/email/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp,
                }),
            });

            if (response.ok) {
                message.success('Verification successful');
                router.push('resetpassword'); // Assuming you want to navigate to the reset password page after successful verification
            } else {
                message.error('Failed to verify. Please check the entered code and try again.');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            message.error('Failed to verify. Please try again later.');
        }
    };

    const getEmailFromLocalStorage = () => {
        // Retrieve the stored email from localStorage
        return localStorage.getItem('verificationEmail') || '';
    };
    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <Image src={logo} height="80px" width="120px"></Image>
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-10">NHẬP MÃ XÁC NHẬN</div>
                <div className="text-zinc-800 text-[17px] font-normal font-['Montserrat'] mt-4 leading-normal">
                    Vui lòng điền số điện thoại/email để xác nhận
                </div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className='flex flex-col space-y-10'>
                    <Form.Item label='' name="otp" className='mb-0'>
                        <div className="flex items-center m-0 space-x-6">
                            <Image src={nameIcon}></Image>
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập mã xác nhận"
                                required></InputCustom>
                        </div>

                    </Form.Item>

                    <Form.Item>
                        <ButtonCustom type='primary' htmlType="submit">TIẾP TỤC</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>
        </TempalteLogin>
    );
}