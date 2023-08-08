import styles from './School.module.css'
import { useState } from 'react'
import { Title, Text, DropdownMenu } from '@/components'
import { Header, Card } from '@/containers'
import schoolsData from '@/data/SCHOOL_CARD.json'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface handleNavigateProps {
  id: number
}

interface SchoolType {
  id: number
  badge: string
  title: string
  content: string
}

const School = () => {
  const navigate = useNavigate()

  // naviate 기능을 지닌 함수
  const handleNavigate = ({ id }: handleNavigateProps) => {
    navigate(`/detail/${id}`)
  }

  const [selectedSchool, setSelectedSchool] = useState<
    '경북대학교' | '고려대학교'
  >('경북대학교')

  const handleSchoolChange = (school: string) => {
    if (school === '경북대학교' || school === '고려대학교') {
      setSelectedSchool(school)
    }
  }

  const selectedSchoolCards = schoolsData.schools[selectedSchool] || []

  const pageTitle =
    selectedSchool === '경북대학교' ? '경북대학교' : '고려대학교'

  return (
    <>
      <Helmet>
        <title>전국민 AI 훈민정음</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai,AI platform,BigData" />
      </Helmet>
      {/* 헤더 */}
      <Header />
      <main className={styles.school}>
        {/* 인트로 */}
        <Title type={1} label="AI훈민정음 서당" className={styles.title} />
        <Text className={styles.text}>
          T3Q.ai를 이용한 각 대학별 프로젝트 결과물
        </Text>
        {/* 메뉴 */}
        <DropdownMenu
          className={styles.menu}
          options={['경북대학교', '고려대학교']}
          onSelect={handleSchoolChange}
        ></DropdownMenu>
        <Title type={2} label={pageTitle} className={styles.subtitle}></Title>
        {/* 학교 렌더링 */}
        <div className={styles['card-container']}>
          {selectedSchoolCards.map((school: SchoolType) => (
            <Card
              key={school.id}
              badge={school.badge}
              title={school.title}
              content={school.content}
              cardColor={selectedSchool === '고려대학교' ? 'korea' : 'kyungbuk'}
              onClickCard={() => handleNavigate({ id: school.id })}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default School
