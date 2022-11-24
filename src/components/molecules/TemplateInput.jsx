import React from "react";
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Error from '../atoms/Error';

export default function TemplateInput({placeholder, label, type, id, value, onChange, error, disabled, color}){

  return(
    <div className='flex flex-col gap-2'>
      <Label id={id}>{label}</Label>
      {disabled ? (
          <Input placeholder={placeholder} id={id} styles='' type={type} value={value} onChange={onChange} disabled/>
        ) : (
          <Input placeholder={placeholder} id={id} styles='' type={type} value={value} onChange={onChange} />
        )
      }
      {error ? <Error>{error}</Error> : null}
    </div>
  )
}