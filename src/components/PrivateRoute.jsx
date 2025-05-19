
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
     // to get token from redux store
    const {token} = useSelector((state)=>state.auth);
    
    // if token is present
    if(token !== null)
        return children
    else
        return <Navigate to = "/"/> // here / -->  means login screen 

};

export default PrivateRoute;
