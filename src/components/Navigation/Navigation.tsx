import styles from './Navigation.module.css'

type Tab = 'introduce' | 'performance'

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        <li
        onClick={() => onTabChange('introduce')}
        className={
          activeTab === "introduce" ? `${styles['list-item']} ${styles.active}` : styles['list-item']
        }>
          AI훈민정음 소개
        </li>
        <li 
        onClick={() => onTabChange('performance')}
        className={
          activeTab === "performance" ? `${styles['list-item']} ${styles.active}` : styles['list-item']
        }>
          28케이스 수행
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
