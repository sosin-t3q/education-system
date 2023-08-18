import styles from './School.module.css'
import { useState } from 'react'
import { Title, Text, DropdownMenu } from '@/components'
import { Header, Card } from '@/containers'
import schoolsData from '@/data/SCHOOL_CARD.json'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { handleNavigate } from '@/utils'
import { useKeycloak } from '@react-keycloak/web'
import { loadingAtom } from '@/atoms'
import { useSetRecoilState } from 'recoil'

interface SchoolType {
  id: number
  badge: string
  title: string
  content: string
}

interface SchoolData {
  [schoolName: string]: {
    color: string;
    title: string;
  };
}


const School = () => {
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const setLoading = useSetRecoilState(loadingAtom)

  const schoolData: SchoolData = {
    경북대학교: {
      color: 'kyungbuk',
      title: '경북대학교',
    },
    고려대학교: {
      color: 'korea',
      title: '고려대학교',
    },
    // 필요한 경우 더 많은 학교, 색상 및 제목을 추가합니다
  }

  const [selectedSchool, setSelectedSchool] = useState<'경북대학교' | '고려대학교'>('경북대학교')


  const handleSchoolChange = (school: string) => {
    if (schoolData[school]) {
      setSelectedSchool(school)
    }
  }

  const selectedSchoolData = schoolData[selectedSchool]
  const cardColor = selectedSchoolData.color
  const pageTitle = selectedSchoolData.title

  const selectedSchoolCards = schoolsData.schools[selectedSchool] || []

  return (
    <>
      <Helmet>
        <title>전국민 AI 훈민정음</title>
        <meta name="description" content="T3Q.ai" />
        <meta name="author" content="t3q" />
        <meta name="keyword" content="T3Q.ai, AI 플랫폼, 빅데이터" />
      </Helmet>
      {/* 헤더 */}
      <Header />
      <main className={styles.school}>
        {/* 인트로 */}
        <Title type={1} label="AI 훈민정음 서당" className={styles.title} />
        <Text className={styles.text}>
          T3Q.ai를 이용한 각 대학 프로젝트 결과물
        </Text>
        {/* 메뉴 */}
        <DropdownMenu
          className={styles.menu}
          options={Object.keys(schoolData)}
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
              cardColor={cardColor}
              // onClickCard={() => handleNavigate({ id: school.id })}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default School
