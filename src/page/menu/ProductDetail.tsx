import React, { useEffect, useState } from 'react'
import { Popconfirm, Upload, Select, Switch, Modal, message } from 'antd';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery, useGetOneProductQuery, useUpdateToppingInProductMutation } from '../../api/menu';
import LoadingOverlay from '../../utils/loading';
import { Option } from 'antd/es/mentions';
import classNames from 'classnames';
import Active from '../../component/Active';
import ListToppingInMenu from './ListToppingInMenu';
import { decryptMessage } from '../../utils/criyto';
import ToppingInProduct from './ToppingInProduct';

const ProductDetail = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams()
    const { data, isLoading: loadingPro, error } = useGetOneProductQuery(id)
  
    const [updateview, { isLoading: loadingview }] = useUpdateToppingInProductMutation()
    const [uploadedImages, setUploadedImages] = useState<any>(data?.data?.image);
    const [category, setcategory] = useState<any>(data?.data?.category)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [desc, setdesc] = useState<any>(data?.data?.description)
    const [view, setview] = useState<any>(data?.data?.view)
    const [name, setname] = useState<any>(data?.data?.name)
    const [price, setprice] = useState<any>(data?.data?.price)
    const [toppingid, settopping] = useState<any>()
    const user = JSON.parse(localStorage.getItem('user')!)
    const data_decrypto = decryptMessage(user)
    const dec = JSON.parse(data_decrypto)
    const { data: allcategory, isLoading: loadingCat } = useGetAllCategoryQuery(dec?.token)
    const [checkbt, setcheckbt] = useState(false)
    useEffect(() => {
        if (desc != data?.data?.description || name != data?.data?.name || price != data?.data?.price || category != data?.data?.category || uploadedImages != data?.data?.image || view!= data?.data?.view ) {
            setcheckbt(true)
        } else {
            setcheckbt(false)
        }

    }, [desc, name, price, view, category, uploadedImages])
    console.log(checkbt);


    const props: any = {
        action: "https://api.cloudinary.com/v1_1/dw6wgytc3/image/upload",
        onChange({ file, fileList }: any) {
            if (file.status !== "uploading") {
                setUploadedImages(file.response.secure_url);
            }
        },
        data: {
            upload_preset: "demo_upload",
            folder: "DUAN",
        },
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        if (toppingid.length != data?.data?.toppings.length) {
            setIsModalOpen(false);
            const dataproduct = {
                name: name ? name : data?.data?.name,
                price: price ? price : data?.data?.price,
                description: desc ? desc : data?.data?.description,
                category: data?.data?.category,
                toppings: toppingid
            }

            updateview({ id: data?.data?.id, product: dataproduct })
                .unwrap()
                .then(() => {
                    messageApi.success('Cập nhập Topping thành công!');

                })
                .catch((data: any) => {
                    messageApi.open({
                        type: "error",
                        content: 'update failure',
                    });
                });
        } else {
            setIsModalOpen(false);
        }



    };
    const topping = (t: any) => {
        const transformedToppings = t.map((id: any) => ({ id }));
        settopping(transformedToppings)
    }
    const Onclick = () => {
        navigate("/menu")
    }
    const HandleClick = () => {
        const dataproduct = {
            name: name ? name : data?.data?.name,
            price: price ? price : data?.data?.price,
            description: desc ? desc : data?.data?.description,
            category: category ? category : data?.data?.category,
            image: uploadedImages ? uploadedImages : data?.data?.image,
            view: view
        }

        updateview({ id: data?.data?.id, product: dataproduct })
            .unwrap()
            .then(() => {
                messageApi.success('update product successfully!');
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
    const HandleView = (e: any) => {
        setview(e)
    }
    return (
        <>
            {loadingCat && <LoadingOverlay />}
            {loadingview && <LoadingOverlay />}
            {contextHolder}
            {!loadingPro ? <div className='ml-20 mr-20 mt-32 mb-32 bg-white shadow-lg'>
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
                    <div className='p-2 flex mb-5'>
                        <div className='w-2/3'>
                            <span>Hình ảnh</span>
                            <p className='mt-2 text-gray-300'>Món có ảnh sẽ được khách đặt nhiều hơn.</p>
                        </div>
                        <div className='ml-auto relative rounded'>
                            <img alt="food" className='w-[100px] h-[100px] object-cover rounded' src={uploadedImages ? uploadedImages : data?.data?.image} />
                            <button className='absolute bottom-0 left-0 w-full h-[50px] bg-gray-500/65 rounded'>
                                <Upload.Dragger {...props} multiple accept=".jpg,.png" className='w-full h-full'>
                                    <span className='text-white'>Sửa</span>
                                </Upload.Dragger>
                            </button>

                        </div>
                    </div>
                    <div className='h-px bg-gray-300 mb-1'></div>
                    <div className='p-2 flex'>
                        <span>Tên<span className='text-red-500'>*</span></span>
                        <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập tên món ăn' defaultValue={data?.data?.name} onChange={(e: any) => setname(e.target.value)} /></span>
                    </div>
                    <div className='h-px bg-gray-300 mb-1'></div>
                    <div className='p-2 flex'>
                        <span>Giá<span className='text-red-500'>*</span></span>
                        <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập giá món ăn' defaultValue={parseInt(data?.data?.price, 10)} onChange={(e: any) => setprice(e.target.value)} /></span>
                    </div>
                    <div className='h-px bg-gray-300 mb-1'></div>
                    <div className='p-2 flex'>
                        <span>Danh mục<span className='text-red-500'>*</span></span>
                        <Select className='w-1/6 ml-auto' onChange={(e: any) => setcategory(e)} defaultValue={data?.data?.category} >
                            {allcategory?.data?.map((data1: any) => {
                                return (
                                    <Option value={data1?.id} key={data1?.id} >{data1?.name}</Option>
                                )
                            })}
                        </Select>

                    </div>
                    <div className='h-px bg-gray-300 mb-1'></div>
                    <div className='p-2 flex'>
                        <span>Mô tả</span>
                        <span className='ml-auto'><input className=' w-full border-0 outline-none p-1 bg-gray-100 text-right' placeholder='Nhập mô tả món ăn' defaultValue={data?.data?.description} onChange={(e: any) => setdesc(e.target.value)} /></span>
                    </div>

                </div>
                <div className='pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
                    <div className='p-2 flex'>
                        <span>Còn món<span className='text-red-500'>*</span></span>
                        <span className='ml-auto'><Switch defaultChecked={data?.data.view} onChange={(e) => HandleView(e)} /></span>
                    </div>
                </div>
                <div className='pl-10 pr-10 mt-5 mb-5 pt-5 pb-5 bg-gray-100'>
                    <button className='p-2 flex items-center justify-between w-full' onClick={() => showModal()}>
                        <span>Nhóm Topping</span>
                        <span className='text-gray-400'>
                            <i className=' ri-arrow-right-s-line' />
                        </span>
                    </button>
                    <div className='h-px bg-gray-300 mb-1'></div>
                    {data?.data?.toppings?.map((data1: any, index: any) => {
                        return (
                            <ToppingInProduct data={data1} />
                        )
                    })}

                </div>
                <Popconfirm
                    title="Xóa món ?"
                    description="Bạn có thực sự muốn xóa món này?"
                    // onConfirm={HandleRemove}
                    okText="Đồng ý"
                    cancelText="Không"
                >
                    <button className=' w-full flex items-center justify-center p-2 border border-gray-600 text-gray-800 rounded' >
                        Xóa món
                    </button>
                </Popconfirm>

                <button
                    onClick={() => HandleClick()}
                    className={classNames(
                        'w-full bottom-0 shadow-xl z-50 p-2 rounded mt-5',
                        {
                            'bg-red-500 text-white': checkbt,  // Nút màu đỏ khi checkbt là true
                            'bg-gray-200 text-black': !checkbt, // Nút màu xám khi checkbt là false
                            'bg-transparent': loadingPro,
                            'text-white': !loadingPro
                        }
                    )}
                    disabled={!checkbt} // Nút bị vô hiệu hóa khi checkbt là false
                >
                    Lưu
                </button>

                <Modal title="Nhóm Topping" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className=''>
                    <ListToppingInMenu id={id} token={dec?.token}
                        onTopping={topping}
                    />
                </Modal>
            </div> : <LoadingOverlay />}

        </>
    )
}

export default ProductDetail