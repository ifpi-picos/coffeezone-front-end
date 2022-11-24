import React from 'react';

export default function Title ({styles, children}) {

  return(
    <>
      <h1 className='text-[2rem] font-bold text-primary'>{children}</h1>
    </>
  )
}