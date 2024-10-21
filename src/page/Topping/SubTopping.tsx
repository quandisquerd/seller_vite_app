import React, { useState } from 'react'
import FormatTotal from '../../utils/FormatTotal'
import { Popconfirm, Switch, message } from 'antd'
import classNames from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOneToppingQuery, useRemoveToppingMutation, useUpdateToppingMutation, useUpdateViewSubtoppingInToppingMutation } from '../../api/topping'
import LoadingOverlay from '../../utils/loading';
import AddSuptoppingInTopping from './AddSubTopping'


const SubTopping = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();
    const { data, isLoading } = useGetOneToppingQuery(id)
    const [updateView, { isLoading: loadding }] = useUpdateViewSubtoppingInToppingMutation()
    const [updateTopping, { isLoading: loaddingtopping }] = useUpdateToppingMutation()
    const [removeTopping , {isLoading: removeing}] = useRemoveToppingMutation()
    const [name, setname] = useState<any>()
    const HandleView = (e: any, idsub: any) => {
        const data = {
            view: e
        }
        updateView({ id: idsub, data })
            .unwrap()
            .then(() => {
                messageApi.success('update topping successfully!');
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const HandleUpdate = () => {
        const datatopping = {
            name: name ? name : data?.data?.name
        }
        updateTopping({ id: id, data: datatopping })
            .unwrap()
            .then(() => {
                messageApi.success('Update topping successfully')
                setTimeout(() => {
                    navigate('/menu')
                }, 500);
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const HandleRemove = () => {
        removeTopping(id)
            .unwrap()
            .then(() => {
                messageApi.success('Remove topping successfully')
                setTimeout(() => {
                    navigate('/menu')
                
                }, 500);
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const Onclick = () => {
        navigate("/menu")
    }
  return (
      <>
          {contextHolder}
          {isLoading && <LoadingOverlay/>}
          {loaddingtopping && <LoadingOverlay />}
          {loadding && <LoadingOverlay />}
          {removeing && <LoadingOverlay />}
          <button className='mb-4' onClick={Onclick}>
              <i className='ri-arrow-left-line text-2xl pr-5 text-red-500' />
              <span className='text-2xl'>Chi tiết món</span>
          </button>
          <div className='pl-10 pr-10 pt-5 pb-5 bg-gray-100'>
              
              <div className='p-2 flex'>
                  <span>Mã</span>
                  <span className='ml-auto'>{data?.data?.id}</span>
              </div>
              <div className='h-px bg-gray-300 mb-1'></div>
              <div className='p-2 flex'>
                  <span>Tên<span className='text-red-500'>*</span></span>
                  <span className='ml-auto'><input className='w-full border-0 outline-none p-1 bg-gray-100 text-right' defaultValue={data?.data?.name} placeholder='Nhập tên món ăn' onChange={(e: any) => setname(e.target.value)} /></span>
              </div>
          </div>
          <div className=' pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
              <div className='p-2 flex'>
                  <span>Món thêm</span>
              </div>
              <div className='h-px bg-gray-300 mb-1'></div>
              {data?.data?.sub_toppings?.map((data1: any) => {
                  return (
                      <div className='p-2 flex' key={data1?.id}>
                          <div className=''>
                              <p>{data1?.name}</p>
                              <p className='text-gray-400'><FormatTotal amount={data1?.price} /></p>
                          </div>
                          <span className='ml-auto'><Switch defaultChecked={data1?.view} onChange={(e:any) => HandleView(e, data1?.id)} /></span>
                      </div>
                  )
              })}
              <div className='h-px bg-gray-300 mb-1'></div>
              <AddSuptoppingInTopping />

          </div>
          <Popconfirm
              title="Xóa nhóm Topping ?"
              description="Bạn có thực sự muốn xóa nhóm Topping này?"
              onConfirm={HandleRemove}
              okText="Đồng ý"
              cancelText="Không"
          >
              <button className=' w-full flex items-center justify-center p-2 border border-gray-600 text-gray-800 rounded'>
                  Xóa nhóm Topping
              </button>
          </Popconfirm>

          <button
              onClick={() => HandleUpdate()}
              disabled={name ? false : true}
              className={classNames(
                  ' w-full  bottom-0 shadow-xl z-50 p-2 mt-4 ',
                  {
                      'bg-red-500 text-white': name,
                      'bg-gray-200 text-black': !name
                  }
              )}
          >
              Lưu
          </button>
      </>
  )
}

export default SubTopping