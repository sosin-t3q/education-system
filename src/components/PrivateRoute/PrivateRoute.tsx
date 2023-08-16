import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const userAuth = Cookies.get('user_auth')

  if(userAuth) {
    return  <Outlet />
  } else {
    return <Navigate to="/home"/>
  }

}

export default PrivateRoute;