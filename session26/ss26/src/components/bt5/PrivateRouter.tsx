import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

function PrivateRouter() {
  const [isLoggedIn] = useState(true); 

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;