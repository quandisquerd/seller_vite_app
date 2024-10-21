import React from 'react'
import classNames from 'classnames';
import SubTopping from './SubTopping';

type Props = {}

const ToppingDetail = (props: Props) => {
  return (
      <div className='ml-40 mr-40 mt-20 mb-20 p-10 bg-white'>
          <SubTopping />
      </div>

  )
}

export default ToppingDetail