import React from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {

  const apiUrl = 'https://coffeezone-waa1.onrender.com';
  // const apiUrl = 'http://localhost:3001';
  const navigate = useNavigate();

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  return(
    <UserContext.Provider value={{apiUrl, data, setData, login, setLogin, loading, setLoading, error, setError, navigate}}>
      {children}
    </UserContext.Provider>
  )
}