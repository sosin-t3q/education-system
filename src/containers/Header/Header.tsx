import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect } from 'react'
import Cookies from 'js-cookie';
import { isLoggedInAtom } from '@/atoms'
import { useRecoilValue } from 'recoil'

const Header = () => {
  const { keycloak, initialized } = useKeycloak()
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  useEffect(() => {
    //로그인을 하면 값이 들어온다
    if (keycloak.authenticated) {
      const authData = {
        access_token: keycloak.token,
        refresh_token: keycloak.refreshToken,
        id_token: keycloak.idToken
      };
      Cookies.set('user_auth', JSON.stringify(authData), { expires: 1 });
  }}, [initialized, keycloak]);

  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>
        <Link path="/">
          <Logo aria-label="AI훈민정음 로고" className={styles.logo} />
        </Link>
        <div className={styles.links}>
          <Link className={`${styles.experience}`} path="/home" children="홈" />
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
                keycloak.logout({ redirectUri: window.location.origin + '/home' });
                Cookies.remove('user_auth');
                }
              }
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
