import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useKeycloak } from '@react-keycloak/web'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styles from './Header.module.css'
import { Link } from '@/components'
import { isLoggedInAtom, navigationAtom } from '@/atoms'
import { ReactComponent as Logo } from '@/assets/logo.svg'

const Header = () => {
  const { keycloak, initialized } = useKeycloak()
  const setActiveTab = useSetRecoilState(navigationAtom)
  const isLoggedIn = useRecoilValue(isLoggedInAtom)

  useEffect(() => {
    //로그인을 하면 값이 들어온다
    if (keycloak.authenticated) {
      const authData = {
        access_token: keycloak.token,
        refresh_token: keycloak.refreshToken,
        id_token: keycloak.idToken,
        user_id: keycloak.idTokenParsed?.sub,
      }
      Cookies.set('user_auth', JSON.stringify(authData), { expires: 1 })
    }
  }, [initialized, keycloak])

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
            {' '}
            T3Q.ai 체험하기{' '}
          </a>
          {!isLoggedIn && (
            <button
              className={`${styles.login}`}
              type="button"
              onClick={() => {
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
