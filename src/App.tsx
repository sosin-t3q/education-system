import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Routes, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { Intro, Home, Detail, School, Error } from '@/pages'
import { isLoggedInAtom, isModalOpenAtom } from './atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useCookie } from '@/hooks/_index'
// import { PrivateRoute } from '@/components'

function App() {

  const isModalOpen = useRecoilValue(isModalOpenAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)

  const { createUserCookie } = useCookie();
  const { keycloak } = useKeycloak()
  const userAuth = Cookies.get("user_auth")

  useEffect(() => {
    //키클락을 경유해 로그인을 했으며 user_auth 쿠키가 없다면 쿠키를 생성한다
    if(keycloak.authenticated && !userAuth) {
      createUserCookie();
    }
  }, [keycloak.authenticated])

  /* user_auth 쿠키를 확인함  */
  useEffect(() => {
    if (userAuth) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [keycloak.authenticated, userAuth])

  /* 모달창이 열려있으면 스크롤바를 제거함 */
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isModalOpen])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/detail/:id" element={<Detail />}></Route>
        {/* </Route> */}
        <Route path="/school" element={<School />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  )
}

export default App
