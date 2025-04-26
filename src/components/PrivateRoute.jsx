import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  return isAuthenticated ? children : <Navigate to="/" />;  
  // jr user Authenticate asel trach tyala bakiche Ui dakhava nahitr tyala fakt --> / route wr aslele  login  page dakhav 
};

export default PrivateRoute;
