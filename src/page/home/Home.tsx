import React from 'react'
import { useNavigate } from 'react-router-dom'
import { decryptMessage } from '../../utils/criyto'
import { useCheckRestaurantQuery } from '../../api/restaurant'



const Home = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')!)
  const data_decrypto = decryptMessage(user)
  const dec = JSON.parse(data_decrypto)
  const { data: checkres } = useCheckRestaurantQuery(dec?.id)
  const onChangMenu = () => {
    navigate('/menu')
  }
  return (
    <div className="card-body ">
      <div className="">
        <div className="min-h-screen flex justify-center items-center">
          <div className="w-full lg:w-4/5 ">

            <div className="flex flex-wrap justify-around gap-5">
              <div className="lg:w-1/4">
                <button className="card shadow-none  w-full" onClick={() => alert('Đơn hàng clicked')}>
                  <div className="card-body text-center flex flex-col justify-center items-center">
                    <div className="avatar-md mx-auto mb-4 mt-7" id="register-tour">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full text-primary text-3xl bg-red-500">
                        <i className="ri-file-list-3-line text-white"></i>
                      </div>
                    </div>
                    <h5 className='mb-5'>Đơn hàng</h5>
                  </div>
                </button>
              </div>
              <div className="lg:w-1/4">
                <button className="card shadow-none  w-full" onClick={() => alert('Đánh giá clicked')}>
                  <div className="card-body text-center flex flex-col justify-center items-center">
                    <div className="avatar-md mx-auto mb-4 mt-7 border-2 rounded-full" id="register-tour">
                      <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full text-primary text-3xl">
                        <i className="ri-star-line text-yellow-500"></i>
                      </div>
                    </div>
                    <h5 className='mb-5'>Đánh giá</h5>
                  </div>
                </button>
              </div>
              <div className="lg:w-1/4">
                <button className="card shadow-none  w-full" onClick={() => onChangMenu()}>
                  <div className="card-body text-center flex flex-col justify-center items-center">
                    <div className="avatar-md mx-auto mb-4 mt-7" id="register-tour">
                      <div className="w-20 h-20 flex items-center justify-center bg-red-500 rounded-full text-primary text-3xl">
                        <i className="ri-file-edit-line text-white"></i>
                      </div>
                    </div>
                    <h5 className='mb-5'>Thực đơn</h5>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home