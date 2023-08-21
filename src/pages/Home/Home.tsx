import { Header, HomeCase, HomeInfo } from '@/containers'
import { Navigation } from '@/components'
import { Helmet } from 'react-helmet-async'
import { navigationAtom } from '@/atoms'
import { useRecoilValue } from 'recoil'

const Home = () => {
  const activeTab = useRecoilValue(navigationAtom)

  return (
    <div>
      <Helmet>
        <title>전국민 AI 훈민정음 | 홈</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai,AI platform,BigData" />
      </Helmet>
      <Header />
      <Navigation />

      {activeTab === 'introduce' && <HomeInfo />}
      {activeTab === 'performance' && <HomeCase />}
    </div>
  )
}

export default Home
