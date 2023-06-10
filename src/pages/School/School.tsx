import styles from './School.module.css'
// import { ReactComponent as Logo } from '@/assets/Logo.svg'
import { Title, Text, DropdownMenu } from '@/components'

const School = () => {
  return (
    <div className={styles.school}>
      {/* 헤더 */}
      {/* <nav className={styles.header}>
        <div className={styles['header-inner']}>
          <a href="#">
            <Logo className={styles['header-inner-left']} />
          </a>
          <div className={styles['header-inner-right']}>
            <a href="#" className={styles.link1}>
              T3Q.ai 체험하기
            </a>
            <a href="#" className={styles.link2}>
              로그인
            </a>
          </div>
        </div>
      </nav> */}
      {/* 인트로 */}
      <Title type={2} label="AI훈민정음 서당" className={styles.title} />
      <Text variant="paragraph" className={styles.subtitle}>
        T3Q.ai를 이용한 각 대학별 프로젝트 결과물
      </Text>
      {/* 메뉴 */}
      <DropdownMenu></DropdownMenu>
    </div>
  )
}

export default School
