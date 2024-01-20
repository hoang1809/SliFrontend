import ButtonCustom from 'components/common/button';
import TempalteLogin from 'components/templates/login';
import {Form} from 'antd';
import  InputCustom  from 'components/common/input';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter()

    const onFinish = (values: any) => {
        router.push('verificationcode')
    };
    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <img src="/assets/icons/logo.svg" className='h-20 w-[120px]' alt="" />
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-10">QUÊN MẬT KHẨU</div>
                <div className="text-zinc-800 text-[17px] font-normal font-['Montserrat'] mt-4 leading-normal">
                    Vui lòng điền số điện thoại/email để xác nhận
                </div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className='flex flex-col space-y-10'>
                    <Form.Item label='' name="username" className='mb-0' rules={[{pattern: /^(?:\d{10,11}|\S+@\S+\.\S+)$/, message:'Số điện thoại hoặc email không hợp lệ!'}]}>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/email.svg" alt="" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập email hoặc số điện thoại"
                                required></InputCustom>
                        </div>
                        
                    </Form.Item>
                    
                    <Form.Item>
                            <ButtonCustom type='primary' htmlType='submit'>GỬI MÃ XÁC NHẬN</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>
        </TempalteLogin>
    );
}
