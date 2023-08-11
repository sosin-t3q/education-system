import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Routes, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { Intro, Home, Detail, School } from '@/pages'
import { isLoggedInAtom, userIdAtom, isModalOpenAtom } from './atoms'
import { useSetRecoilState, useRecoilValue } from 'recoil'

function App() {

  /* user_auth 쿠키를 확인하는 함수 */
  const { keycloak } = useKeycloak()
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)
  const setUserId = useSetRecoilState(userIdAtom)
  const isModalOpen = useRecoilValue(isModalOpenAtom);

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
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/school" element={<School />}></Route>
        <Route path="*" element={<div>404 페이지</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
