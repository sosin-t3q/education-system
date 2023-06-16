import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/logo.svg'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles['header-inner']}>
        <Logo className={styles.logo}></Logo>
        <div className={styles.links}>
          <Link
            className={`${styles.experience}`}
            path="/"
            label="T3Q.ai 체험하기"
            option={1}
          />
          <Link
            className={`${styles.login}`}
            path="/"
            label="로그인"
            option={1}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
