import TempalteLogin from 'components/templates/login';
import logo from 'public/assets/icons/usthicon.png';
import Image from 'next/image';
import { Form, message} from 'antd';
import passwordIcon from 'public/assets/icons/password.svg'
import { InputPassword } from 'components/common/input';
import ButtonCustom from 'components/common/button';
import { useRouter } from 'next/router';

export default function Signup() {
    const router = useRouter()

    const onFinish = async (values: any) => {
        try {
            const password = values.password;
            const email = getEmailFromLocalStorage();

            const response = await fetch(`http://47.128.244.84:8001/auth/reset-password/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                }),
            });

            if (response.ok) {
                message.success('Password reset successfully');
                router.push('login');
            } else {
                message.error('Failed to reset password. Please try again.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            message.error('Failed to reset password. Please try again later.');
        }
    };

    const getEmailFromLocalStorage = () => {
        return localStorage.getItem('verificationEmail') || '';
    };
    
    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
            <Image src={logo} height='250px' className='object-scale-down'></Image>
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-9">ĐẶT LẠI MẬT KHẨU</div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className='flex flex-col space-y-8'>

                    <Form.Item label="" name="password"
                        rules={[
                            {
                                required: true,
                            },
                            {pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/, message:'Mật khẩu chứa ít nhất 8 kí tự bao gồm 1 chữ cái viết hoa và 1 số'}
                        ]}>
                        <div className="flex items-center space-x-6">
                            <Image src={passwordIcon}></Image>
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập mật khẩu mới" 
                                required></InputPassword>
                        </div>
                    </Form.Item>

                    <Form.Item label="" name="confirm"
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
                            <Image src={passwordIcon}></Image>
                            <InputPassword
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Nhập lại mật khẩu" 
                                required></InputPassword>
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
