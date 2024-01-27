import Link from 'next/link';
import TempalteLogin from 'components/templates/login';
import { Form, message } from 'antd';
import  {InputPassword }  from 'components/common/input';
import   {InputCustom}   from 'components/common/input';
import { useRouter } from 'next/router';
import ButtonCustom from 'components/common/button';

export default function Signup() {
    const router = useRouter()

    // const onFinish = (values: any) => {
    //     router.push('login')
    // };
    const onFinish = async (values: any) => {
        try {

            const isEmail = values.email.includes('@');
            const email = isEmail ? values.email : '';
            const phoneNumber = isEmail ? '' : values.email;
            const isHost = false;

            const dataToSend = {
                email,
                phoneNumber,
                password: values.password,
                name: values.name,
                isHost
            };
            const response = await fetch('http://47.128.244.84:8001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                message.success('Registration successful');
                router.push('login');
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error('Registration failed');
        }
    };

    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <img src="/assets/icons/logo.svg" className='h-20 w-[120px]' alt="" />
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-9">ĐĂNG KÝ</div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className=' space-y-8'>
                    <Form.Item label='' name="name" className='mb-0'>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/user-square.svg" alt="usernameicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Họ và tên"
                                required></InputCustom>
                        </div>
                    </Form.Item>

                    <Form.Item label='' name="email" className='mb-0' rules={[{ pattern: /^(?:\d{10}|\S+@\S+\.\S+)$/, message: 'Số điện thoại hoặc email không hợp lệ!' }]}>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/email.svg" alt="emailicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập email hoặc số điện thoại"
                                required></InputCustom>
                        </div>
                    </Form.Item>


                    <Form.Item label="" name="password"
                        rules={[
                            {
                                required: true,
                            },
                            { pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/, message: 'Mật khẩu chứa ít nhất 8 kí tự bao gồm 1 chữ cái viết hoa và 1 số' }
                        ]}>
                        <div className="flex items-center space-x-6">
                            <img src="/assets/icons/password.svg" alt="passwordicon" />
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập mật khẩu"
                                required></InputPassword>
                        </div>
                    </Form.Item>
                    <Form.Item label='' name="confirm" dependencies={['password']}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp'));
                                },
                            }),
                        ]}>
                        <div className="flex items-center space-x-6">
                            <img src="/assets/icons/password.svg" alt="passwordicon" />
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập lại mật khẩu"
                                required></InputPassword>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <ButtonCustom type='primary' htmlType='submit'>ĐĂNG KÝ</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>

            <div className='flex justify-center text-[17px]'>
                <p>Đã có tài khoản?</p>
                <Link href="/login">
                    <a className='font-bold text-[#f2584c] hover:text-orange-700' href="">Đăng nhập ngay</a>
                </Link>
            </div>
        </TempalteLogin>
    );
}
