import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { Routes, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { currentModalAtom } from '@/atoms'
import { useCreateUserCookie } from '@/hooks/_index'
import { Intro, Home, Detail, School, Error } from '@/pages'
import { getUserAuthCookie } from './utils'

function App() {
  const currentModal = useRecoilValue(currentModalAtom)

  const { keycloak } = useKeycloak()
  const createUserCookie = useCreateUserCookie()
  const userAuth = getUserAuthCookie()
  
  useEffect(() => {
    //키클락을 경유해 로그인을 했으며 user_auth 쿠키가 없다면 쿠키를 생성한다
    if (keycloak.authenticated && !userAuth) {
      createUserCookie()
    }
  }, [keycloak.authenticated])

  /* 모달창이 열려있으면 스크롤바를 제거함 */
  useEffect(() => {
    if (currentModal) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [currentModal])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/school" element={<School />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
