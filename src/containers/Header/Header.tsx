import styles from './Header.module.css'
import { Link } from '@/components'
import { ReactComponent as Logo } from '@/assets/Logo.svg'

const Header = () => {
  return (
    <div className={styles.header}>
      <Logo className={styles.logo}></Logo>
      <Link
        className={`${styles.experience}`}
        path="/"
        label="T3Q.ai 체험하기"
        option={1}
      />
      <Link className={`${styles.login}`} path="/" label="로그인" option={2} />
    </div>
  )
}

export default Header
