import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Routes, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { Intro, Home, Detail, School } from '@/pages'
import { isLoggedInAtom, userIdAtom, isModalOpenAtom } from './atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useCookie } from '@/hooks/_index'
// import { PrivateRoute } from '@/components'

function App() {

  const setUserId = useSetRecoilState(userIdAtom)
  const isModalOpen = useRecoilValue(isModalOpenAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)

  const { createUserCookie } = useCookie();
  const { keycloak, initialized } = useKeycloak()

  useEffect(() => {
    //로그인을 사용자 쿠키가 생성된다
    createUserCookie();
  }, [initialized, keycloak])

  /* user_auth 쿠키를 확인함  */
  useEffect(() => {
    const userAuth = Cookies.get('user_auth')
    
    if (userAuth) {
      const userAuthObject = JSON.parse(userAuth)
      const userId = userAuthObject.user_id
      setIsLoggedIn(true)
      setUserId(userId)
    } else {
      setIsLoggedIn(false)
      setUserId('')
    }
  }, [keycloak.authenticated])

  /* 모달창이 열려있으면 스크롤바를 제거함 */
  useEffect(() => {
    if(isModalOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove("no-scroll");
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
        <Route path="*" element={<div>404 페이지</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
