import React from 'react';

export default function Input ({placeholder, id, styles, type, value, onChange}) {

  return(
    <>
      <input placeholder={placeholder} id={id} className='p-3 rounded border border-solid border-secondary font-bold text-primary focus:outline-none' type={type} value={value} onChange={({target}) => onChange(target.value)} />
    </>
  )
}