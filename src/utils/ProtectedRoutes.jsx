// import React from 'react';
// import {Outlet} from 'react-router-dom';
// import {UserContext} from '../store/UserContext';

// export default function ProtectedRoutes () {
//   const {login, navigate} = React.useContext(UserContext);

//   if(login) return <Outlet />;
//   else if(!login) return navigate('/login');
//   else return null;
// }

import {Outlet} from 'react-router-dom';

export default function ProtectedRoutes () {
  return <Outlet />;
}