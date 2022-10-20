import React from "react"

const types = {
  name: {
    regex: /^.{3,}$/,
    message: "O nome deve conter pelo menos 3 caracteres.",
  }, 
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Utilize um e-mail válido.",
  }, 
  password: {
    regex: /^.{8,}$/,
    message: "A senha deve conter pelo menos 8 caracteres.",
  }
};

export default function useForm(type){

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Prencha este campo.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange(value) {
    if(error) validate(value);
    setValue(value);
  }

  return {
    error,
    setError,
    value,
    setValue,
    onChange,
    validate: () => validate(value)
  }
}