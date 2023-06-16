import styles from './School.module.css'
import { useState } from 'react'
import { Title, Text, DropdownMenu, Pagination } from '@/components'
import { Header, Card } from '@/containers'
import { schools } from '@/data/cards'

const School = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {/* 헤더 */}
      <Header />
      <main className={styles.school}>
        {/* 인트로 */}
        <Title type={1} label="AI훈민정음 서당" className={styles.title} />
        <Text className={styles.text}>
          T3Q.ai를 이용한 각 대학별 프로젝트 결과물
        </Text>
        {/* 메뉴 */}
        <DropdownMenu className={styles.menu}></DropdownMenu>
        <Title type={2} label="경북대학교" className={styles.subtitle}></Title>
        <div className={styles['card-container']}>
          {schools.경북대학교.map(school => {
            return (
              <Card
                badge={school.badge}
                title={school.title}
                content={school.content}
              />
            )
          })}
        </div>
        <Pagination
          totalPage={5}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  )
}

export default School
