import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkComponent ({ children, path }) {

  return(
    <Link to={path} className='m-auto text-primary text-base underline hover:font-semibold'>
      {children}
    </Link>
  )
}