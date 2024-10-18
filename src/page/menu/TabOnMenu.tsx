import { Tabs } from 'antd'
import React from 'react'
import Topping from '../Topping/Topping';
import MenuDetail from './MenuDetail';

type Props = {}

const TabOnMenu = (props: Props) => {
    const items: any = [
        {
            key: '1',
            label: 'Món',
            children: (
                <MenuDetail />
            )
        },
        {
            key: '2',
            label: 'Nhóm Topping',
            children: (
                <Topping />
            )
        }
    ];
  return (
      <Tabs defaultActiveKey="1" items={items} className="w-full custom-tabs" />
  )
}

export default TabOnMenu