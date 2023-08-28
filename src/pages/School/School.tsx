import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Title, Text, DropdownMenu } from '@/components'
import styles from './School.module.css'
import schoolsData from '@/data/SCHOOL_CARD.json'
import useHandleNavigate from '@/hooks/useHandleNavigate'
import { Header, Card } from '@/containers'
import { isModalOpenAtom } from '@/atoms'
import { useSetRecoilState } from 'recoil'

interface SchoolType {
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

  const initialSelectedSchool =
    sessionStorage.getItem('selectedSchool') || '경북대학교'

  const [selectedSchool, setSelectedSchool] = useState<
    '경북대학교' | '고려대학교'
  >(initialSelectedSchool)
  const checkAuthNavigation = useHandleNavigate()
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)

  const handleSchoolChange = (school: string) => {
    if (schoolData[school as '경북대학교' | '고려대학교']) {
      setSelectedSchool(school as '경북대학교' | '고려대학교')
      sessionStorage.setItem('selectedSchool', school) // 선택한 학교를 세션 스토리지에 저장
    }
  }

  useEffect(() => {
    console.log(selectedSchool)
  }, [selectedSchool])

  // popstate 이벤트(뒤로/앞으로 탐색)를 감지합니다.
  useEffect(() => {
    const handlePopState = () => {
      const storedSchool =
        sessionStorage.getItem('selectedSchool') || '경북대학교'
      setSelectedSchool(storedSchool)
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const selectedSchoolData = schoolData[selectedSchool]
  const cardColor = selectedSchoolData.color
  const pageTitle = selectedSchoolData.title
  const selectedSchoolCards = schoolsData.schools[selectedSchool] || []

  //서당페이지에서 레이아웃을 클릭할 경우 스크롤이 사라지는 걸 방지하기 위한 방법
  useEffect(() => {
    setIsModalOpen(false)
  }, [])

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
