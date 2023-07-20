import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/logo.svg'
import { useKeycloak } from "@react-keycloak/web";

const Header = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <div className={styles.header}>
      <div className={styles['header-inner']}>
        <Link path="/">
          <Logo className={styles.logo}></Logo>
        </Link>
        <div className={styles.links}>
        <Link
            className={`${styles.experience}`}
            path="/home"
            children="홈"
          />
          <Link
            className={`${styles.experience}`}
            path="/school"
            children="서당"
          />
          <Link
            className={`${styles.experience}`}
            path="http://hunmin.demo.t3q.ai/ADVENTURE"
            children="T3Q.ai 체험하기"
          />
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
    </div>
  )
}

export default Header
