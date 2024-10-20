import { Switch, Table, message } from "antd";
import LoadingOverlay from "../../utils/loading";
import { useState } from "react";
import React from "react";
import FormatTotal from "../../utils/FormatTotal";
import './style.css';
import { useNavigate } from "react-router-dom";
import { useUpdateToppingInProductMutation } from "../../api/menu";




const ProductInMenu = ({ data }: any) => {
    const navigate= useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [updateview, { isLoading: loadingview }] = useUpdateToppingInProductMutation()
    const HandleView = (product: any, e: any) => {
        const dataproduct = {
            name: product?.name,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            image: product?.image,
            view: e
        }
        updateview({ id: product.id, product: dataproduct })
            .unwrap()
            .then(() => {
                if (e) {
                    messageApi.success('Món đã được bật!');
                } else {
                    messageApi.success('Món đã tắt!');
                }
            })
            .catch((data: any) => {
                messageApi.open({
                    type: "error",
                    content: 'update failure',
                });
            });
    }
    const columns = [
        {
            dataIndex: 'image',
            key: 'Image',
            render: (image: any) => (
                <div className='ml-auto relative rounded'>
                    <img alt="food" className='w-[100px] h-[100px] object-cover rounded' src={image} />
                </div>
            ),
        },
        {
            dataIndex: 'name',
            key: 'name',
            render: (name: any) => (
                <p className=" font-bold">{name}</p>
            ),
        },
        {
            dataIndex: 'price',
            key: 'price',
            render: (price: any) => (
                <FormatTotal amount={price} />
            ),
        },
        {
            dataIndex: 'view',
            key: 'view',
            render: (view: boolean, product: any) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch defaultChecked={view}
                    onChange={(e) => HandleView(product, e)}
                    />
                </div>
            ),
        },
    ];
    const handleRowClick = (record: any) => {
        navigate(`${record?.id}/detail`)
    };
    return (
        <>
            {contextHolder}
            {loadingview && <LoadingOverlay/>}
            <Table dataSource={data} columns={columns} pagination={false} rowKey="id" onRow={(record) => ({
                onClick: () => handleRowClick(record),
            })} />
        </>
    )
}

export default ProductInMenu