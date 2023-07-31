import { useState } from 'react'
import styles from './Home.module.css'
import { Header, HomeCase, HomeInfo } from '@/containers'
import { Navigation } from '@/components'
import { Helmet } from 'react-helmet-async'

type Tab = 'introduce' | 'performance'

const Home = () => {
  const [activeTab, setActiveTab] = useState<Tab>('introduce')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
  }
  return (
    <div className={styles.home}>
      <Helmet>
        <title>전국민 AI 훈민정음</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai,AI platform,BigData" />
      </Helmet>
      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'introduce' && <HomeInfo />}
      {activeTab === 'performance' && <HomeCase />}
    </div>
  )
}

export default Home
