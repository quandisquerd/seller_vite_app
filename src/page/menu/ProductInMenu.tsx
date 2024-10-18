import { Switch, Table, message } from "antd";
import LoadingOverlay from "../../utils/loading";
import { useState } from "react";
import React from "react";
import FormatTotal from "../../utils/FormatTotal";
import './style.css';




const ProductInMenu = ({ data }: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<any>();
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
                    // onChange={(e) => HandleView(product, e)}
                    />
                </div>
            ),
        },
    ];
    return (
        <>
            {contextHolder}
            {isLoading ? (
                <LoadingOverlay />
            ) : ""}
            <Table dataSource={data} columns={columns} pagination={false} rowKey="id" onRow={(record) => ({
            })} />
        </>
    )
}

export default ProductInMenu