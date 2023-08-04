import styles from './Navigation.module.css'
import { navigationAtom } from '@/atoms'
import { useRecoilState } from 'recoil'

const Navigation = () => {
  const [activeTab, setActiveTab] = useRecoilState(navigationAtom)

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li
          onClick={() => setActiveTab('introduce')}
          className={
            activeTab === 'introduce'
              ? `${styles['list-item']} ${styles.active}`
              : styles['list-item']
          }
        >
          AI훈민정음 소개
        </li>
        <li
          onClick={() => setActiveTab('performance')}
          className={
            activeTab === 'performance'
              ? `${styles['list-item']} ${styles.active}`
              : styles['list-item']
          }
        >
          28케이스 수행
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
