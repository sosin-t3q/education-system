import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { useKeycloak } from '@react-keycloak/web'
import { useSetRecoilState } from 'recoil'
import styles from './Header.module.css'
import { Link } from '@/components'
import { navigationAtom } from '@/atoms'
import { ReactComponent as Logo } from '@/assets/logo.svg'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const setActiveTab = useSetRecoilState(navigationAtom)
  
  const { keycloak } = useKeycloak()
  const userAuth = Cookies.get("user_auth")
  
  useEffect(() => {
    if(keycloak.authenticated || userAuth) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [keycloak.authenticated, userAuth])


  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <Link path="/">
          <Logo aria-label="AI훈민정음 로고" className={styles.logo} />
        </Link>
        <div className={styles.links}>
          <Link
            className={`${styles.experience}`}
            onClick={() => setActiveTab('introduce')}
            path="/home"
            children="홈"
          />
          <Link
            className={`${styles.experience}`}
            onClick={() => setActiveTab('performance')}
            path="/home"
            children="수행"
          />
          <Link
            className={`${styles.experience}`}
            path="/school"
            children="서당"
          />
          <a href="/adventure" className={`${styles.adventure}`}>
            T3Q.ai 체험하기
          </a>
          {!isLoggedIn && (
            <button
              className={`${styles.login}`}
              type="button"
              onClick={() => {
                //키클락 로그인 페이지로 이동
                keycloak.login()
              }}
            >
              로그인
            </button>
          )}
          {isLoggedIn && (
            <button
              className={`${styles.login}`}
              type="button"
              onClick={() => {
                //로그아웃 이후 /home으로 이동한 다음 user_auth 쿠키 제거
                keycloak.logout({
                  redirectUri: `${window.location.origin}/home`,
                })
                Cookies.remove('user_auth')
              }}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
