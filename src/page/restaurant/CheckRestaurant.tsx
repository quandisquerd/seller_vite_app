import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const CheckRestaurant = (props: Props) => {
  const navigate = useNavigate()
  const HandleClick=()=>{
    navigate("/createRestaurant")
  }
  return (
    <>

      <div className="flex flex-col items-center justify-center h-screen">
        <i className=' ri-shopping-bag-3-line text-9xl text-red-500' />
        <p className="mt-2">Không có quán nào</p>
        <Button className="mt-10 bg-red-500 text-white p-5" onClick={HandleClick}> Tạo quán ngay</Button>
      </div>
    </>
  )
}

export default CheckRestaurant