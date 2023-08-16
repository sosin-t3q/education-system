import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '@/atoms'

const PrivateRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  return isLoggedIn ? <Outlet /> : <Navigate to="/home"/>
}

export default PrivateRoute;