import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {

  const apiUrl = 'http://localhost:3001';

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  return(
    <UserContext.Provider value={{apiUrl, data, login, loading, error}}>
      {children}
    </UserContext.Provider>
  )
}