import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) return <Navigate to="/home" />; // Redirect if already logged in
    return children;
}

export default PublicRoute;
