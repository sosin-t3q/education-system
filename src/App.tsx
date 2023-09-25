import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useUserCookie } from '@/hooks/_index'
import { Intro, Home, Detail, School, Error } from '@/pages'
import { getUserAuthCookie } from './utils'

function App() {

  const { keycloak } = useKeycloak()
  const { createUserCookie, deleteUserCookie } = useUserCookie()
  const userAuth = getUserAuthCookie()
  
  useEffect(() => {
    //키클락을 경유해 로그인을 했으며 user_auth 쿠키가 없다면 쿠키를 생성한다
    if (keycloak.authenticated && !userAuth) {
      createUserCookie()
    } else if (!keycloak.authenticated && userAuth) {
      deleteUserCookie()
    }
  }, [keycloak.authenticated])

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
