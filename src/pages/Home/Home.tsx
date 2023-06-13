import { useState } from 'react'
import styles from "./Home.module.css"
import { Header, HomeInfo } from "@/containers";
import { Navigation } from "@/components";


type Tab = 'introduce' | 'performance';

const Home = () => {
  const [activeTab, setActiveTab] = useState<Tab>('introduce')

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
  }
    return(
      <div className={styles.home}>
        <Header />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'introduce' && <HomeInfo/>}
      </div>
    )
}

export default Home;