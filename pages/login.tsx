import Image from 'next/image';
import Link from 'next/link';
import TempalteLogin from 'components/templates/login';
import { Form, Checkbox } from 'antd';
import { InputPassword, InputCustom } from 'components/common/input';
import ButtonCustom from 'components/common/button';
import { useRouter } from "next/router"


export default function Login() {
    const router = useRouter()

    const onFinish = (values: any) => {
        router.push('/')
    };

    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <Image src='/assets/icons/logo.svg' height="80px" width="120px"></Image>
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-10">ĐĂNG NHẬP</div>
                <div className="text-zinc-800 text-[17px] font-normal font-['Montserrat'] mt-4 leading-normal">
                    Vui lòng điền số điện thoại/email và mật khẩu để đăng nhập
                </div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className='flex flex-col space-y-10'>
                    <Form.Item label='' name="username" className='mb-0' rules={[{pattern: /^(?:\d{10,11}|\S+@\S+\.\S+)$/, message:'Số điện thoại hoặc email không hợp lệ!'}]}> 
                        <div className="flex items-center m-0 space-x-6">
                            <Image src='/assets/icons/email.svg' height='36px' width='36px'></Image>
                            <InputCustom
                                style={{ border: 'none',boxShadow:'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập email hoặc số điện thoại"
                                required></InputCustom>
                        </div>
                        
                    </Form.Item>
                    <Form.Item label='' name="password">
                        <div className="flex items-center space-x-6">
                            <Image src='/assets/icons/password.svg' height='36px' width='36px'></Image>
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập mật khẩu" 
                                required></InputPassword>
                        </div>
                    </Form.Item>
                    <div className='flex justify-between'>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Lưu mật khẩu</Checkbox>
                        </Form.Item>
                        <Link href="/forgotpassword">
                            <a className='underline' href="">Quên mật khẩu? </a>
                        </Link>
                    </div>
                    <Form.Item>
                        {/* <Button 
                            block
                            type="primary"
                            htmlType="submit"
                            className='h-[72px] bg-[#F2584C] rounded-[16px] hover:bg-[#F2584C] border-none p-2.5 justify-center items-center'>ĐĂNG NHẬP
                        </Button> */}
                        <ButtonCustom type='primary' htmlType='submit'>ĐĂNG NHẬP</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>

            <div className='flex justify-center text-[17px]'>
                    <p>Chưa có tài khoản?</p>
                    <Link href="/register">
                        <a className='font-bold text-[#f2584c] hover:text-orange-700' href="signup">Đăng ký ngay</a>
                    </Link>
            </div>
        </TempalteLogin>
    );
}