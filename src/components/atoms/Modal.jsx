import React from 'react';

export default function Modal ({children}) {

  return(
    <div className='py-8 px-6 bg-neutral text-primary rounded-[4px] flex flex-col gap-8 shadow-custom'>
      {children}
    </div>
  )
}