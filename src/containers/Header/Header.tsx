import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import { useKeycloak } from '@react-keycloak/web'

const Header = () => {
  const { keycloak, initialized } = useKeycloak()

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
          {!keycloak.authenticated && (
            <button
              className={`${styles.login}`}
              type="button"
              onClick={() => keycloak.login()}
            >
              로그인
            </button>
          )}
          {!!keycloak.authenticated && (
            <button
              className={`${styles.login}`}
              type="button"
              onClick={() => keycloak.logout()}
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
