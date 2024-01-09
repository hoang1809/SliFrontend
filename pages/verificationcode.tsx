import logo from 'public/assets/icons/logo.svg';
import Image from 'next/image';
import TempalteLogin from 'components/templates/login';
import { Button, Form, Input,} from 'antd';
import nameIcon from 'public/assets/icons/email.svg'
import { InputCustom } from 'components/common/input';
import ButtonCustom from 'components/common/button';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter()

    const onFinish = (values: any) => {
        router.push('resetpassword')
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
                    <Form.Item label='' name="username" className='mb-0'>
                        <div className="flex items-center m-0 space-x-6">
                            <Image src={nameIcon}></Image>
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập mã xác nhận"
                                required></InputCustom>
                        </div>
                        
                    </Form.Item>
                    
                    <Form.Item>
                        {/* <Button 
                            block
                            type="primary"
                            htmlType="submit"
                            className='h-[72px] bg-[#F2584C] rounded-[16px] hover:bg-[#F2584C] border-none p-2.5 justify-center items-center'>TIẾP TỤC
                        </Button> */}
                        <ButtonCustom type='primary' href='resetpassword'>TIẾP TỤC</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>
        </TempalteLogin>
    );
}