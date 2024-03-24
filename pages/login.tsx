import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/assets/icons/usthicon.png';
import TempalteLogin from 'components/templates/login';
import { Form, Checkbox, message } from 'antd';
import  {InputPassword } from 'components/common/input';
import {InputCustom} from 'components/common/input';
import ButtonCustom from 'components/common/button';
import { useRouter } from "next/router"


export default function Login() {
    const router = useRouter()


    const onFinish = async (values: any) => {
        try {
            const isEmail = values.username.includes('@');
            const email = isEmail ? values.username : '';
            const phoneNumber = isEmail ? '' : values.username;
            const isHost = false

            const dataToSend = {
            email,
            phoneNumber,
            password: values.password,
            isHost
            };
        const response = await fetch('http://localhost:8001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem('access_token', responseData.access_token);
            localStorage.setItem('user_email', email);
            router.push('/');
        } else {
            message.error('Đăng nhập thất bại, vui lòng điền đúng thông tin.');
        }
        } catch (error) {
            console.error('Error during login:', error);
            message.error('Login failed. Please try again later.');
        }
    };

    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <Image src={logo} height='250px' className='object-scale-down'></Image>
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-6">LOGIN</div>
                <div className="text-zinc-800 text-[17px] font-normal font-['Montserrat'] mt-3 leading-normal">
                    Please enter your email address and password to login
                </div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className='flex flex-col space-y-10'>
                    <Form.Item label='' name="username" className='mb-0' rules={[{pattern: /^(?:\d{10,11}|\S+@\S+\.\S+)$/, message:'Số điện thoại hoặc email không hợp lệ!'}]}> 
                        <div className="flex items-center m-0 space-x-6">
                            <Image src='/assets/icons/email.svg' height='36px' width='36px'></Image>
                            <InputCustom
                                style={{ border: 'none',boxShadow:'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Enter email address"
                                required></InputCustom>
                        </div>
                        
                    </Form.Item>
                    <Form.Item label='' name="password">
                        <div className="flex items-center space-x-6">
                            <Image src='/assets/icons/password.svg' height='36px' width='36px'></Image>
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Enter password" 
                                required></InputPassword>
                        </div>
                    </Form.Item>
                    <div className='flex justify-between'>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Save password</Checkbox>
                        </Form.Item>
                        <Link href="/forgotpassword">
                            <a className='underline' href="">Forgot password? </a>
                        </Link>
                    </div>
                    <Form.Item>
                        <ButtonCustom type='primary' htmlType='submit'>LOGIN</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>

            <div className='flex justify-center text-[17px]'>
                    <Link href="/register">
                        <a className='font-semibold text-[#273895] hover:text-blue-700' href="signup">Sign up</a>
                    </Link>
            </div>
        </TempalteLogin>
    );
}
