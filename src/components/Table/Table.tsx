import TABLE_DATA from '@/data/TABLE_DATA.json'
import styles from './Table.module.css'

function Table() {
  const columns = TABLE_DATA[0].columns
  const data = TABLE_DATA[1].data

  return (
    <table className={styles.table}>
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
              <td>{CLF}</td>
              <td>{REG}</td>
              <td>{ANORM}</td>
              <td>{CLS}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
