import React, { useEffect, useState } from 'react'
import LoadingOverlay from '../../utils/loading';
import { useGetToppingInProductInCategoryQuery } from '../../api/menu';
import { Checkbox } from 'antd';

const ListToppingInMenu = ({ id,token, onTopping }: any) => {
    const { data, isLoading } = useGetToppingInProductInCategoryQuery({id,token})
    const [checkedToppings, setCheckedToppings] = useState<number[]>([]);
    useEffect(() => {
        if (data?.toppingActive) {
            const activeToppingIds = data?.toppingActive?.map((item: any) => item.id);
            setCheckedToppings(activeToppingIds);
        }
    }, [data?.toppingActive]);

    const onChange = (e: any, toppingId: number) => {
        if (e.target.checked) {
            setCheckedToppings(prev => [...prev, toppingId]);

        } else {
            setCheckedToppings(prev => prev.filter(id => id !== toppingId));
        }
    };
    useEffect(() => {
        if (checkedToppings) { onTopping(checkedToppings) }
    }, [checkedToppings])




  return (
      <div>
          {isLoading && <LoadingOverlay/>}
          {data?.toppingActive?.length === 0 ? "" : (
              <div className="bg-gray-100 p-2">
                  <p>Đã liên kết</p>
                  <div className='h-px bg-gray-300 mt-2 mb-2'></div>
                  <div className='space-y-4'>
                      {data?.toppingActive?.map((item: any) => {
                          const names = item?.sub_toppings
                              ?.filter((data3: any) => data3?.view === true)
                              ?.map((data4: any) => data4?.name)
                              .join(', ');
                          return (
                              <div className='flex items-center' key={item?.id}>
                                  <Checkbox
                                      checked={checkedToppings.includes(item?.id)}
                                      className='mr-2'
                                      onChange={(e) => onChange(e, item?.id)}
                                  />
                                  <div>
                                      <p className="text-sl font-medium">{item?.name}</p>
                                      <span className='text-gray-400'>{names}</span>
                                  </div>
                                  <div className='h-px bg-gray-300 mt-2 mb-2'></div>
                              </div>
                          )
                      })}
                  </div>
              </div>
          )}

          {data?.toppingUnactive?.length === 0 ? "" : (
              <div className="bg-gray-100 p-2 mt-5">
                  <p>Chưa liên kết</p>
                  <div className='h-px bg-gray-300 mt-2 mb-2'></div>
                  <div className='space-y-4'>
                      {data?.toppingUnactive?.map((item: any) => {
                          const names = item?.sub_toppings?.map((subItem: any) => subItem?.name).join(', ');
                          return (
                              <div className='flex items-center' key={item?.id}>
                                  <Checkbox
                                      checked={checkedToppings.includes(item?.id)}
                                      className='mr-2'
                                      onChange={(e) => onChange(e, item?.id)}
                                  />
                                  <div>
                                      <p className="text-sl font-medium">{item?.name}</p>
                                      <span className='text-gray-400'>{names}</span>
                                  </div>
                                  <div className='h-px bg-gray-300 mt-2 mb-2'></div>
                              </div>
                          )
                      })}
                  </div>
              </div>
          )}
      </div>
  )
}

export default ListToppingInMenu