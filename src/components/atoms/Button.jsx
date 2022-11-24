import React from "react";

export default function Button({children, color, onClick, loading}){

  if(loading){
    return <button className='p-3 rounded bg-secondary font-bold boder-none cursor-pointer min-w-[7rem] text-white' disabled style={{backgroundColor: color}}>
      {children}
    </button>
  } else {
    return <button className='p-3 rounded bg-secondary font-bold boder-none cursor-pointer min-w-[7rem] text-white' style={{backgroundColor: color}} onClick={onClick}>{children}</button>
  }

}