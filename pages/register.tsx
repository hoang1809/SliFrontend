import Link from 'next/link';
import Image from 'next/image';
import TempalteLogin from 'components/templates/login';
import logo from 'public/assets/icons/usthicon.png';
import { DatePicker, Form, Select, message } from 'antd';
import { InputPassword } from 'components/common/input';
import { InputCustom } from 'components/common/input';
import { useRouter } from 'next/router';
import ButtonCustom from 'components/common/button';

export default function Signup() {
    const router = useRouter()
    const { RangePicker } = DatePicker;

    // const onFinish = (values: any) => {
    //     router.push('login')
    // };
    const onFinish = async (values: any) => {
        try {

            // const isEmail = values.email.includes('@');
            // const email = isEmail ? values.email : '';
            // const phoneNumber = isEmail ? '' : values.email;
            const isHost = false;

            const month = values.DoB["$M"] + 1;
            const day = values.DoB["$D"];
            const year = values.DoB["$y"];
            const formattedDate = day + "/" + month + "/" + year;

            const dataToSend = {
                name: values.name,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
                gender: values.gender,
                DoB: formattedDate,
                year_start: values.intake[0]["$y"],
                year_graduated: values.intake[1]["$y"],
                Student_ID: values.id,
                isHost
            };

            console.log(dataToSend)
            const response = await fetch('http://localhost:8001/auth/register', {
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
                const responseData = await response.json();
                if (responseData.message === "Email ready axist!" || "Phone number ready axist!") {
                    message.error('Thông tin đăng nhập đã tồn tại');
                } else {
                    message.error('Registration failed');
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error('Registration failed');
        }
    };
    // const onFinish = (values: any) => {
    //     const month = values.DoB["$M"] + 1;
    //     const day = values.DoB["$D"];
    //     const year = values.DoB["$y"];
    //     const formattedDate = day + "/" + month + "/" + year;

    //     const dataToSend = {
    //         name: values.name,
    //         Student_id: values.id,
    //         gender: values.gender,
    //         dob: formattedDate,
    //         year_start: values.intake[0]["$y"],
    //         year_graduate: values.intake[1]["$y"],
    //         email: values.email,
    //         phoneNumber: values.phoneNumber
    //     };

    //     console.log(dataToSend);
    // }

    return (
        <TempalteLogin>
            <div className="flex max-h-full flex-col items-center">
                <Image src={logo} height='250px' className='object-scale-down'></Image>
                <div className="text-zinc-800 text-[40px] font-['Montserrat Alternates'] mt-6">SIGN UP</div>
            </div>

            <div className="w-full">
                <Form onFinish={onFinish} className=' space-y-8'>
                    <Form.Item label='' name="name" className='mb-0'>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/user-square.svg" alt="usernameicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Name"
                                required></InputCustom>
                        </div>
                    </Form.Item>

                    <Form.Item label='' name="id" className='mb-0'>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/idcard.svg" alt="usernameicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Student ID"
                                required></InputCustom>
                        </div>
                    </Form.Item>

                    <Form.Item label='' name="phoneNumber" className='mb-0' rules={[{ pattern:  /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ!' }]}>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/phone.svg" alt="phoneicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Phone number"
                                required></InputCustom>
                        </div>
                    </Form.Item>

                    <Form.Item label='' name="email" className='mb-0' rules={[{ pattern:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ!' }]}>
                        <div className="flex items-center m-0 space-x-6">
                            <img src="/assets/icons/email.svg" alt="emailicon" />
                            <InputCustom
                                style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                                placeholder="Email address"
                                required></InputCustom>
                        </div>
                    </Form.Item>

                    <Form.Item name='gender' label={<img src="/assets/icons/gender.svg" alt="gendericon" />} colon={false}>

                        <Select
                            placeholder='Gender'
                            style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                        >
                            <Select.Option value="Male">Nam</Select.Option>
                            <Select.Option value="Female">Nữ</Select.Option>
                        </Select>


                    </Form.Item>

                    <Form.Item name='DoB' label={<img src="/assets/icons/dob.svg" alt="dobicon" />} colon={false}>

                        <DatePicker
                            placeholder='Date of birth'
                            style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                        />

                    </Form.Item>
                    <Form.Item name='intake' label={<img src="/assets/icons/date.svg" alt="dobicon" />} colon={false}>

                        <RangePicker
                            picker="year"
                            placeholder={['Start', 'End']}
                            style={{ border: 'none', borderBottom: '1px solid #D9D9D9', outline: 'none' }}
                        />

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
                                placeholder="Password"
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
                                placeholder="Confirm password"
                                required></InputPassword>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <ButtonCustom type='primary' htmlType='submit'>SIGN UP</ButtonCustom>
                    </Form.Item>
                </Form>
            </div>

            <div className='flex justify-center text-[17px]'>
                <p>Already have an account?</p>
                <Link href="/login">
                    <a className='font-bold text-[#273895] hover:text-blue-700' href="">Login</a>
                </Link>
            </div>
        </TempalteLogin>
    );
}
