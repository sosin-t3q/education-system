import TABLE_DATA from '@/data/TABLE_DATA.json'
import styles from './Table.module.css'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface handleNavigateProps {
  id: number
}

const Table = () => {
  const title = TABLE_DATA.title
  const columns = TABLE_DATA.content[0].columns
  const data = TABLE_DATA.content[1].data
  const navigate = useNavigate()

  // 이벤트 버블링을 막아주는 함수
  const preventBubbling = (e: MouseEvent<HTMLTableElement>) => {
    e.stopPropagation()
  }

  // naviate 기능을 지닌 함수
  const handleNavigate = ({ id }: handleNavigateProps) => {
    navigate(`/detail/${id}`)
  }

  return (
    <table className={styles.table} onClick={preventBubbling}>
      <caption className={styles.caption}>{title}</caption>
      <thead>
        <tr>
          {
            //기둥의 갯수 + 기둥 제목
            columns?.map(({ id, title }) => {
              return (
                <th key={id} className={styles['top-title']}>
                  <span className={styles['top-title-span']}>{title}</span>
                </th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {data?.map(({ id, side, CLF, REG, ANORM, CLS }) => {
          return (
            <tr key={id}>
              <th className={styles['side-title']}>
                <span className={styles['side-title-span']}>{side}</span>
              </th>
              <td onClick={() => handleNavigate(CLF)}>{CLF.title}</td>
              <td onClick={() => handleNavigate(REG)}>{REG.title}</td>
              <td onClick={() => handleNavigate(ANORM)}>{ANORM.title}</td>
              <td onClick={() => handleNavigate(CLS)}>{CLS.title}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
