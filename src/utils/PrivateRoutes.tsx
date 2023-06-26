import { Outlet } from 'react-router'
import { checkUserCookie } from './index'
// import { checkUserCookie, createUserCookie, deleteUserCookie } from './index'
// createUserCookie('user_auth', 'adsadas', 2)
// deleteUserCookie()

const PrivateRoutes = () => {
  if (checkUserCookie()) {
    return <Outlet></Outlet>
  } else {
    window.location.href =
      'http://hunmin.demo.t3q.ai:8080/auth/realms/t3q_ai_edu/protocol/openid-connect/auth?client_id=common&response_type=code&redirect_uri=http://hunmin.demo.t3q.ai/page-redirector/signIn-AIHUNMIN&scope=openid&state=BiJHS'
  }
}

export default PrivateRoutes
