import { Button, Card, Drawer, Form, Input, Modal, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react'
import { decryptMessage } from '../../utils/criyto';
import { useCreateToppingMutation, useGetAllToppingQuery } from '../../api/topping';
import FormatTotal from '../../utils/FormatTotal';
import { useNavigate } from 'react-router-dom';


const Topping = () => {
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [subtopping, setsutopping] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem('user')!)
  const data_decrypto = decryptMessage(user)
  const dec = JSON.parse(data_decrypto)
  const { data } = useGetAllToppingQuery(dec?.token)
  const [name, setName] = useState<any>()
  const [name1, setname1] = useState<any>()
  const [price, setprice] = useState<any>()
  const [createTopping] = useCreateToppingMutation()
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showDrawer1 = () => {
    form.resetFields()
    setsutopping([])
    setOpen1(true);
  };

  const onClose1 = () => {
    form.resetFields()
    setOpen1(false);
  };
  const handleRowClick = (record: any) => {
    navigate(`topping/${record?.id}/detail`)
    // router.push(`/modules/seller/topping/${record?.id}`);
  };
  const onSubmit1 = () => {
    const data = {
      name: name,
      sub_toppings: subtopping.map((item: any) => ({
        ...item,
        view: true
      }))
    }
    createTopping({ data: data, token: dec?.token })
      .unwrap()
      .then(() => {
        messageApi.success('Tạo Topping thành công')
        form.resetFields()
        setOpen1(false);
      })
      .catch((data: any) => {
        messageApi.open({
          type: "error",
          content: 'create failure',
        });
      });
  }
  const handleOk = () => {
    const newTopping = {
      name: name1,
      price: price,
      view: true
    }
    setsutopping((prevToppings: any) => [...prevToppings, newTopping]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <div className=" flex" >
        <button className="pb-2 pl-2 line-clamp-3 mr-2" onClick={showDrawer1} ><i className='ri-add-line' />Thêm</button>
      </div >
      <Space direction="vertical" size={16} className='w-full'>
        {data?.map((data1: any) => {
          const names = data1?.sub_toppings
            ?.filter((data3: any) => data3?.view === true)
            ?.map((data4: any) => data4?.name)
            .join(', ');
          return (
            <Card
              key={data1?.id}
              title={data1?.name}
              extra={
                <button onClick={() => handleRowClick(data1)}>
                  <p>
                    {data1?.countview}/{data1?.sub_toppings?.length}
                    <i className="ri-arrow-right-s-line" />
                  </p>
                </button>
              }
              className="w-full"
            >
              <span>{names}</span>
            </Card>
          )
        })}

      </Space>
      <Drawer
        title="Thêm Topping"
        className='w-full'
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
        <Form form={form} layout="vertical" className='w-full'>

          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Please enter topping name' }]}
            className='w-full'
          >
            <Input placeholder="Nhập tên Topping" onChange={(e: any) => setName(e.target.value)} className='w-full' />
          </Form.Item>



          <Form.Item
            name="sub_toppings"
            label="Món thêm"
            className='w-full'
          >
            {subtopping?.length > 0 ?
              subtopping?.map((data: any, index: any) => {
                return (
                  <div className="flex border border-gray-200 p-2" key={index}>
                    <span>{data?.name}</span>
                    <span className='ml-auto'><FormatTotal amount={data?.price} /></span>
                  </div>
                )
              })
              : ""}
          </Form.Item>

          <button className='mt-3 w-full flex items-center justify-center pt-2 pb-2 text-gray-800 rounded border border-gray-200' onClick={showModal}>
            <i className='ri-add-line' />Thêm Topping
          </button>
          <Modal title="Thêm Topping" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} afterClose={() => {
            setname1("");
            setprice("");

          }}>
            <Form form={form} >
              <div className='bg-gray-100 p-2 flex mt-10'>
                <span>Tên<span className='text-red-400'>*</span></span>
                <span className='ml-auto'><Input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='VD: Tương ớt' value={name1 ? name1 : ""} onChange={(e: any) => setname1(e.target.value)} /></span>
              </div>
              <div className='bg-gray-100 p-2 flex mt-2'>
                <span>Giá<span className='text-red-400'>*</span></span>
                <span className='ml-auto'><Input type='number' className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='đ' value={price ? price : ""} onChange={(e: any) => setprice(e.target.value)} /></span>
              </div>
            </Form>
          </Modal>
        </Form>
      </Drawer>
    </>
  )
}

export default Topping