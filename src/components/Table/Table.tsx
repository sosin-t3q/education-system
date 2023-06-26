import TABLE_DATA from '@/data/TABLE_DATA.json'
import styles from './Table.module.css'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { tableAtom } from '@/atoms'
import { ReactComponent as Warning } from '@/assets/warning.svg'

const Table = () => {
  const table = useRecoilValue(tableAtom)

  const layer = TABLE_DATA.find(item => item.title === table)

  const title = layer?.title
  const columns = layer?.content[0].columns
  const data = layer?.content[1].data
  const navigate = useNavigate()

  // naviate 기능을 지닌 함수
  const handleNavigate = ({ id }: { id: number }) => {
    navigate(`/detail/${id}`)
  }

  if (columns?.length && data?.length) {
    return (
      <table className={styles.table}>
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
  } else {
    return (
      <div className={styles['warning-table']}>
        <span className={styles['warning-title']}>{title}</span>
        <div className={styles['warning-content']}>
          <Warning className={styles['warning-symbol']}></Warning>
          데이터가 아직 준비되지 않았습니다
        </div>
      </div>
    )
  }
}

export default Table
