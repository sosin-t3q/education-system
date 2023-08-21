import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const userAuth = Cookies.get('user_auth')

  if(userAuth) {
    return  <Outlet />
  } else {
    console.log("여기가 문제임ㅋ")
    return <Navigate to="/home"/>
  }

}

export default PrivateRoute;