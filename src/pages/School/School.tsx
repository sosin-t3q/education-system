import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Title, Text, DropdownMenu } from '@/components'
import styles from './School.module.css'
import schoolsData from '@/data/SCHOOL_CARD.json'
import useHandleNavigate from '@/hooks/useHandleNavigate'
import { Header, Card } from '@/containers'
import { isModalOpenAtom } from '@/atoms'
import { useSetRecoilState } from 'recoil'
import { getSessionStorage, setSessionStorage } from '@/utils'

interface SchoolType {
  jockey: string
  id: number
  badge: string
  title: string
  content: string
}

interface SchoolData {
  [schoolName: string]: {
    color: string
    title: string
  }
}

const School = () => {
  // 학교 데이터
  const schoolData: SchoolData = {
    고려대학교: {
      color: 'korea',
      title: '고려대 지능정보 SW아카데미',
    },
    경북대학교: {
      color: 'kyungbuk',
      title: '경북대학교',
    },
    // 필요한 경우 더 많은 학교, 색상 및 제목을 추가합니다
  }

  const selectableSchools = Object.keys(schoolData)

  // 상태와 훅
  const initialSelectedSchool = getSessionStorage() || selectableSchools[0]
  const [selectedSchool, setSelectedSchool] = useState<string>(
    initialSelectedSchool,
  )
  const checkAuthNavigation = useHandleNavigate()
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  // 학교 변경 처리
  const handleSchoolChange = (school: string) => {
    if (schoolData.hasOwnProperty(school)) {
      setSelectedSchool(school)
      setSessionStorage(school) // 선택한 학교 정보를 세션 스토리지에 저장
    }
  }

  // 효과
  useEffect(() => {
    // console.log(selectedSchool)
  }, [selectedSchool])

  // popstate 이벤트 감지(뒤로/앞으로 탐색)
  useEffect(() => {
    const handlePopState = () => {
      const storedSchool =
        sessionStorage.getItem('selectedSchool') || selectableSchools[0]
      setSelectedSchool(storedSchool)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // 서당페이지에서 레이아웃 클릭 시 스크롤이 사라지는 것 방지
  useEffect(() => {
    setIsModalOpen(false)
  }, [])

  // 렌더링
  const selectedSchoolData = schoolData[selectedSchool]
  const cardColor = selectedSchoolData.color
  const pageTitle = selectedSchoolData.title
  const selectedSchoolCards = schoolsData.schools[selectedSchool] || []

  return (
    <>
      <Helmet>
        <title>전국민 AI훈민정음 | 서당</title>
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
          options={selectableSchools}
          onSelect={handleSchoolChange}
        ></DropdownMenu>
        <Title type={2} label={pageTitle} className={styles.subtitle}></Title>
        {/* 학교 렌더링 */}
        <div className={styles['card-container']}>
          {selectedSchoolCards.map((school: SchoolType) => (
            <Card
              key={school.id}
              badge={school.badge}
              jockey={school.jockey}
              title={school.title}
              content={school.content}
              cardColor={cardColor}
              onClickCard={() => {
                checkAuthNavigation(school.id)
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default School
