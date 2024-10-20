import React from 'react'
import { Switch } from 'antd';

const Active = ({as}:any) => {
  return (
      <Switch defaultChecked={as}
      />
  )
}

export default Active