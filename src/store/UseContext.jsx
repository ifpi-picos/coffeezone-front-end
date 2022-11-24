import React from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [data, setData] = React.useState({
    name: "euueueeueu",
    role: "Member",
    card: "000000000"
  });
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if(data){
      switch(data.role){
        case 'Visitor':
          setData({...data, role: 'Visitante'});
        break;
        case 'Coordinator':
          setData({...data, role: 'Coordenador'});
        break;
        case 'Member':
          setData({...data, role: 'Membro'});
        break;
        default:
          break;
      }
    }
  }, [data])
  
  return(
    <UserContext.Provider value={{apiUrl, data, setData, login, setLogin, loading, setLoading, error, setError, navigate}}>
      {children}
    </UserContext.Provider>
  )
}