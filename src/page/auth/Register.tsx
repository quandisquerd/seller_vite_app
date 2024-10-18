import { Form, Input, Modal, message } from 'antd'
import { Button } from 'antd/es/radio'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { encryptMessage } from '../../utils/criyto'
import { useRegisterSerlerMutation, useSetPasswordMutation, useVerifyOtpSerlerMutation } from '../../api/auth'
import { InputOTP } from 'antd-input-otp';
import LoadingOverlay from '../../utils/loading';


const Register = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [register, { isLoading: loadingRegister }] = useRegisterSerlerMutation()
    const [setPassword, { isLoading: loadingSetPass }] = useSetPasswordMutation()
    const [verify, { isLoading: loadingVerify }] = useVerifyOtpSerlerMutation()
    const [email, setemail] = useState<any>()
    const [password, setpassword] = useState<any>()
    const [isCounting, setIsCounting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkotp, setCheckotp] = useState(false);

    const formatTime = (timeInSeconds: any) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const HandleRegister = (e: any) => {
        e.preventDefault();
        const data_endcrypt = encryptMessage({ "email": email })
        const data = {
            "data": data_endcrypt
        }
        register(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsCounting(true);
                    setIsModalOpen(true)

                    messageApi.success("Gửi OTP thành công!");
                } else {
                    messageApi.error(res?.data?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })

    }
    const handleFinish = (otp: any) => {
        const resultString = otp.join('')
        const data_endcrypt = encryptMessage({ "email": email, "otp": resultString })
        const data = {
            "data": data_endcrypt
        }
        verify(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsModalOpen(false);
                    setCheckotp(true)
                    messageApi.success(res?.message);
                } else {
                    messageApi.error(res?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })
    };
    const onFinish = (e: any) => {
        const data_endcrypt = encryptMessage({ "email": email, "password": password })
        const data = {
            "data": data_endcrypt
        }
        setPassword(data)
            .unwrap()
            .then((res: any) => {
                if (res?.status == true) {
                    setIsModalOpen(false);
                    setCheckotp(true)
                    messageApi.success("Đăng ký thành công!");
                    setTimeout(() => {
                        navigate('/login')
                    }, 300);

                } else {
                    messageApi.error(res?.data?.error);
                }
            })
            .catch((err: any) => {
                messageApi.error(err?.data?.error);
            })

    }
    console.log(email);

    return (
        <>
            {contextHolder}
            {loadingVerify && <LoadingOverlay />}
            {loadingSetPass && <LoadingOverlay />}
            {loadingRegister && <LoadingOverlay />}
            <div className="auth-page-content min-h-screen flex items-center justify-center bg-gray-200">
                <div className="container mx-auto">

                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <div className="text-center mt-2">
                                    <h5 className="text-primary text-xl font-semibold">Create New Account</h5>
                                    <p className="text-gray-600">Get your free FOOD account now</p>
                                </div>

                                <div className="p-2 mt-4">
                                    <Form className="needs-validation" noValidate onFinish={onFinish}>
                                        <label htmlFor="useremail" className="block text-gray-700">
                                            Email <span className="text-red-600">*</span>
                                        </label>
                                        <Form.Item className="mb-4" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>

                                            {checkotp ? <span
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 block"
                                            >
                                                {email}
                                            </span> : <div className='flex w-full'>
                                                <Input

                                                    value={email}
                                                    onChange={(e: any) => setemail(e?.target?.value)}
                                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                                    placeholder="Enter email address"

                                                />
                                                <Button
                                                    type="primary"
                                                    className="w-1/3 ml-1 pt-1 pb-1 mt-1 bg-green-500 text-white border border-gray-300 rounded-md focus:ring hover:bg-green-300 hover:text-white h-full"
                                                    onClick={(e) => HandleRegister(e)}
                                                >
                                                    Gửi OTP
                                                </Button>
                                            </div>
                                            }


                                        </Form.Item>
                                        <Modal
                                            open={isModalOpen}
                                            onCancel={() => setIsModalOpen(false)}
                                        >
                                            <InputOTP inputType="numeric" autoSubmit={handleFinish} />
                                        </Modal>
                                        {checkotp ? <>
                                            <label htmlFor="password-input" className="block text-gray-700">
                                                Password
                                            </label>
                                            <Form.Item

                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                            >
                                                <Input
                                                    type="password"
                                                    id="password-input"
                                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                                    onChange={(e: any) => setpassword(e?.target?.value)}
                                                    placeholder="Enter password"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                    required
                                                />

                                            </Form.Item>

                                        </> : ""}

                                        <div className="mt-4">
                                            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                                                Sign Up
                                            </button>
                                        </div>

                                    </Form>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-blue-600 underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register