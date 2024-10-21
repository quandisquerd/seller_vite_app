import { Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useCreateSubtoppingInToppingMutation } from '../../api/topping';
import { useForm } from 'antd/es/form/Form';
import LoadingOverlay from '../../utils/loading';


type Props = {}

const AddSuptoppingInTopping = (props: Props) => {
    const { id } = useParams();
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createSubtopping, { isLoading:subding }] = useCreateSubtoppingInToppingMutation()
    const [name, setname] = useState<any>()
    const [price, setprice] = useState<any>()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        const data = {
            name: name,
            price: price,
            topping_id: id,
            view: true
        }
        createSubtopping(data)
            .unwrap()
            .then(() => {
                messageApi.success("Tạo Topping thành công!")
                form.resetFields()
                setname("");
                setprice("");
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            {contextHolder}
            {subding && <LoadingOverlay/>}
            <button className=' w-full flex items-center justify-center pt-3 text-gray-800 rounded' onClick={showModal}>
                <PlusOutlined className='mr-2' /> Thêm Topping
            </button>
            <Modal title="Thêm Topping" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item
                        name="name"  // liên kết tên của input với Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập tên topping!' }]}
                    >
                        <div className='bg-gray-100 p-2 flex mt-10'>
                            <span>Tên<span className='text-red-400'>*</span></span>
                            <span className='ml-auto'><Input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='VD: Tương ớt' onChange={(e: any) => setname(e.target.value)} /></span>
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="price"  // liên kết tên của input với Form.Item
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <div className='bg-gray-100 p-2 flex mt-2'>
                            <span>Giá<span className='text-red-400'>*</span></span>
                            <span className='ml-auto'><Input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='đ' onChange={(e: any) => setprice(e.target.value)} /></span>
                        </div>
                    </Form.Item>
                    
                </Form>

            </Modal>
        </div>
    )
}

export default AddSuptoppingInTopping