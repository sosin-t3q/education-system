/* import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userIdAtom } from '@/atoms';
import { useRecoilValue } from 'recoil';

const PrivateRoute = () => {
  const userId = useRecoilValue(userIdAtom)
  const userAuth = Cookies.get('user_auth')

  if(userAuth || userId) {
    return  <Outlet />
  } else {
    console.log("여기가 문제임ㅋ")
    return <Navigate to="/home"/>
  }

}

export default PrivateRoute; */