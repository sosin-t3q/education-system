import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/logo.svg'

const Header = () => {
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
          <Link
            className={`${styles.experience}`}
            path="http://hunmin.demo.t3q.ai/ADVENTURE"
            children="T3Q.ai 체험하기"
          />
          <Link
            className={`${styles.login}`}
            path="http://hunmin.demo.t3q.ai:8080/auth/realms/t3q_ai_edu/protocol/openid-connect/auth?client_id=common&response_type=code&redirect_uri=http://hunmin.demo.t3q.ai/page-redirector/signIn-AIHUNMIN&scope=openid&state=toAnP"
            children="로그인"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
