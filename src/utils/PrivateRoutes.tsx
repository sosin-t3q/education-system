import { Outlet } from 'react-router'
import { checkUserCookie, createUserCookie, deleteUserCookie } from './index'

// createUserCookie('user_auth', 'adsadas', 2)
// deleteUserCookie()

const PrivateRoutes = () => {
  if (checkUserCookie()) {
    return <Outlet></Outlet>
  } else {
    window.location.href = 'http://www.naver.com'
  }
}

export default PrivateRoutes
