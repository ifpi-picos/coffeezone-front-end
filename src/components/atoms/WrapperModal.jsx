import React from 'react';

export default function WrapperModal ({children, setModal}) {

  function handleClick (e) {
    if(e.target === e.currentTarget) setModal(false);
  }

  return(
    <div className='fixed h-[100vh] w-[100vw] inset-0 flex justify-center items-center p-4 z-50 backdrop-blur-[1px]' onClick={handleClick}>
      {children}
    </div>
  )
}