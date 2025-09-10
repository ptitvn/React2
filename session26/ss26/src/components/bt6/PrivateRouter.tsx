import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter({ user }: { user: any }) {
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;