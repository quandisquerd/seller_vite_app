import { Button, Col, Collapse, Drawer, Form, Image, Input, Popconfirm, Row, Select, Space, Upload, message } from 'antd'
import React, { useState } from 'react'
import { decryptMessage } from '../../utils/criyto'
import { useCreateCategoryMutation, useCreateProductMutation, useGetAllMenuQuery } from '../../api/menu'
import ProductInMenu from './ProductInMenu'
import LoadingOverlay from '../../utils/loading'
import { useForm } from 'antd/es/form/Form'
import { Option } from 'antd/es/mentions'
import { useGetAllToppingQuery } from '../../api/topping'


const MenuDetail = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const { data, isLoading: menuding } = useGetAllMenuQuery(dec?.token)
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<any>();
    const [name, setName] = useState<any>()
    const [price, setprice] = useState<any>()
    const [category, setCategory] = useState<any>()
    const [description, setDescription] = useState<any>()
    const [toppingid, setTopping] = useState<any[]>([])
    const [create, { isLoading: loadingproduct }] = useCreateProductMutation()
    const [createcategory, { isLoading: loadingcategory }] = useCreateCategoryMutation()
    const { data: topping } = useGetAllToppingQuery(dec?.token)
    const [fileList, setFileList] = useState<any[]>([]);


    const allKeys = data?.map((item: any) => `${item?.id}`);
    const items: any = data?.map((data1: any, index: any) => {
        return {
            key: data1?.id,
            label: (
                <div className="flex  " key={index}>
                    <span className="font-bold" style={{ marginBottom: -2 }}>{data1?.category?.toUpperCase()}</span>
                    <div className="ml-auto">
                        <span>{data1?.countview}/{data1?.products?.length}</span>
                        <Popconfirm
                            title="Xóa danh mục ?"
                            description="Bạn có thực sự muốn xóa danh mục này? Các sản phẩm kèm theo sẽ bị xóa cùng!"
                            // onConfirm={() => HandleRemove(data1?.id)}
                            okText="Đồng ý"
                            cancelText="Không"
                        >
                            <Button icon={<i className='ri-delete-bin-5-line' />} className="ml-2"></Button>
                        </Popconfirm>
                    </div>

                </div>
            ),
            children: (<ProductInMenu data={data1?.products} />)
        }

    })
    const showDrawer = () => {
        form.resetFields()
        setOpen(true);
    };
    const showDrawer1 = () => {
        form.resetFields()
        setOpen1(true);
    };
    const onClose = () => {
        form.resetFields()
        setOpen(false);
    };
    const onClose1 = () => {
        form.resetFields()
        setOpen1(false);
    };
    const onSubmit = () => {
        setOpen(false);
        const data = {
            name: name,
            price: price,
            image: uploadedImages,
            description: description,
            category: category,
            topping_ids: toppingid
        }

        create(data)
            .unwrap()
            .then(() => {
                messageApi.success('Tạo sản phẩm thành công')
                form.resetFields()
                
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'create failure',
                });
            });
    }
    const HandleTopping = (value: any) => {
        setTopping(value);
    }
    const onSubmit1 = () => {
        setOpen1(false);
        const data = {
            name: name,
        }
        createcategory({ data: data, token: dec?.token })
            .unwrap()
            .then(() => {
                messageApi.success('Tạo danh mục thành công')
                form.resetFields()
                
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'create failure',
                });
            });
    }
    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file, fileList }: any) {
            if (file.status !== "uploading") {
                setUploadedImages(file.response.secure_url);
            }
            setFileList(fileList);
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    return (
        <>
            {contextHolder}
            {menuding && <LoadingOverlay />}
            {loadingcategory && <LoadingOverlay />}
            {loadingproduct && <LoadingOverlay />}
            <div className=" flex">
                <button className="pb-2 pl-2 line-clamp-3 mr-2" onClick={showDrawer} ><i className='ri-add-line r-1' />Thêm</button>
                <button className="pb-2 pl-2 line-clamp-3" onClick={showDrawer1} ><i className='ri-add-line r-1' />Thêm danh mục </button>
            </div>
            <Collapse items={items} defaultActiveKey={allKeys} />
            <Drawer
                title="Thêm món"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Nhập tên sản phẩm" onChange={(e: any) => setName(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Hình ảnh'
                                name="image"
                                className="col-md-10"
                                validateTrigger={["onChange", "onBlur"]}
                            >
                                {uploadedImages ? <Image src={uploadedImages} style={{ width: 200 }} /> :
                                    <Upload.Dragger {...props} multiple accept=".jpg,.png">
                                        <Button icon={<i className=' ri-upload-2-line' />}>Upload</Button>
                                    </Upload.Dragger>
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[{ required: true, message: 'Please select an price' }]}
                            >
                                <Input placeholder="Nhập giá sản phẩm" type='number' onChange={(e: any) => setprice(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Danh mục"
                                rules={[{ required: true, message: 'Please choose the category' }]}
                            >
                                <Select placeholder="Danh mục" onChange={(value: any) => setCategory(value)}>
                                    {data?.map((data1: any) => {
                                        return (
                                            <Option value={data1?.id} key={data1?.id}>{data1?.category}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="Nhập mô tả" onChange={(e: any) => setDescription(e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='w-full'>
                        <Col className='w-full'>
                            <Form.Item
                                name="topping"
                                label="Nhóm Topping"
                            >
                                <Select placeholder="Chọn nhóm Topping" mode="multiple" variant="filled" onChange={(e: any) => HandleTopping(e)}>
                                    {topping?.map((data1: any) => {
                                        return (
                                            <Option value={data1?.id} key={data1?.id}>{data1?.name}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            <Drawer
                title="Thêm danh mục"
                width={720}
                onClose={onClose1}
                open={open1}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose1}>Cancel</Button>
                        <Button onClick={onSubmit1} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form} className='w-full'>
                    <Row className='w-full'>
                        <Col className='w-full'>
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[{ required: true, message: 'Please enter category name' }]}
                                className='w-full'
                            >
                                <Input placeholder="Nhập tên danh mục" onChange={(e: any) => setName(e.target.value)} className='w-full' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>

    )
}

export default MenuDetail