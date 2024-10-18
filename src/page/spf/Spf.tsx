import React from 'react'
import { decryptMessage } from '../../utils/criyto'
import { useCheckRestaurantQuery } from '../../api/restaurant'
import CheckRestaurant from '../restaurant/CheckRestaurant'

type Props = {}

const Spf = (props: Props) => {
  const user = JSON.parse(localStorage?.getItem('user')!)
  const data_decrypto = decryptMessage(user)
  const dec = data_decrypto ? JSON.parse(data_decrypto) : ""
  const { data: checkres, isLoading: checking } = useCheckRestaurantQuery(dec ? dec?.id : "")
  return (
    <>
      {checkres?.status == false && < CheckRestaurant/>}
        < div className='mt-20'>Spf</ div>
    </>
  )
}

export default Spf