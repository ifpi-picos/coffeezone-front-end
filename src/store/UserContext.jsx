import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {

  const apiUrl = 'https://coffeezone-waa1.onrender.com';

  // React.useEffect(()=>{
  //   console.log(loading)
  // }, [loading])

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  console.log(loading)

  return(
    <UserContext.Provider value={{apiUrl, data, login, loading, setLoading, error}}>
      {children}
    </UserContext.Provider>
  )
}