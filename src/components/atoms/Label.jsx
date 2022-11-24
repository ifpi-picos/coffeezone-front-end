import React from 'react';

export default function Label ({id, styles, children}) {
  return(
    <>
      <label htmlFor={id} className='text-primary font-bold'>{children}</label>
    </>
  )
}