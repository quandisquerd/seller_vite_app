import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { encryptMessage } from '../../utils/criyto'
import { Button, Form, Input, message } from 'antd'
import { useLoginMutation } from '../../api/auth'
import LoadingOverlay from '../../utils/loading'



const Login = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState<any>()
  const [password, setPassword] = useState<any>()
  const [login, { isLoading: logining }] = useLoginMutation()
  const HandleLogin = () => {
    const data_endcrypt = encryptMessage({ "email": email, "password": password })
    const data = {
      "data": data_endcrypt
    }
    console.log(data);
    login(data)
      .unwrap()
      .then((res: any) => {
        messageApi.success(res?.message);
        localStorage.setItem("user", JSON.stringify(res?.data))
        setTimeout(() => {
          window.location.href = ('/')
        }, 500);

      })
      .catch((err: any) => {
        messageApi.error(err?.data?.error);
      })

  }
  return (
    <>
      {contextHolder}
      <div className="auth-page-content bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          {logining && (
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <LoadingOverlay />
            </div>
          )}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="text-center">
                  <h5 className="text-blue-600 text-xl font-semibold">Seller Welcome Back!</h5>
                  <p className="text-gray-600 mt-2">Sign in to continue to FOOD.</p>
                </div>
                <div className="mt-4">
                  <Form onFinish={HandleLogin}>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <Form.Item
                      className="mb-4"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                      <Input
                        type="email"
                        id="email"
                        onChange={(e: any) => setEmail(e?.target?.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        placeholder="Enter email"
                      />
                    </Form.Item>

                    <label htmlFor="password-input" className="block text-gray-700">Password</label>
                    <Form.Item
                      className="mb-4"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input
                        type="password"
                        id="password"
                        onChange={(e: any) => setPassword(e?.target?.value)}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        placeholder="Enter password"
                      />
                    </Form.Item>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="auth-remember-check"
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="auth-remember-check" className="text-gray-700">Remember me</label>
                    </div>

                    <Form.Item className='w-full mt-6'>
                      <Button htmlType="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                        SignIn
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?
                  <Link to="/register" className="text-blue-600 underline">
                    Register
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

export default Login