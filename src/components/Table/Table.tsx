import styles from './Table.module.css'
import data from '@/data/LAYERS_DATA.json'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tableAtom, modalAtom, loadingAtom } from '@/atoms'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import { useKeycloak } from '@react-keycloak/web'

const Table = () => {
  const table = useRecoilValue(tableAtom)
  const setModal = useSetRecoilState(modalAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const isLoggedIn = keycloak.authenticated

  const layer = data.find(item => item.title === table)

  const title = layer?.title
  const columns = layer?.columns
  const rows = layer?.rows
  const body = layer?.body

  const handleNavigate = (id: number) => {
    // setLoading(true);
    // if (!isLoggedIn) {
    //   setModal(false);
    //   setTimeout(() => {
    //     keycloak.login();
    //     setLoading(false);
    //   }, 1000)
    // } else {
    //   setModal(false);
    //   navigate(`/detail/${id}`)
    //   setLoading(false);
    // }
    setLoading(true)
    setModal(false)
    navigate(`/detail/${id}`)
    setLoading(false)
  }

  if (columns && rows && body) {
    return (
      <>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.table}>
          {/* 테이블 헤더 */}
          <div className={styles.columns}>
            {columns?.map((column: { id: number; header: string }) => {
              return (
                <div key={column.id} className={styles['column-data']}>
                  <span className={styles['column-text']}>{column.header}</span>
                </div>
              )
            })}
          </div>
          {/* 사이드 헤더 & 바디 데이터 */}
          <div className={styles.container}>
            <div className={styles.rows}>
              {rows?.map((row: { id: number; side: string }) => {
                return (
                  <div key={row.id} className={styles['row-data']}>
                    <span>{row.side}</span>
                  </div>
                )
              })}
            </div>
            <div className={styles.body}>
              {body?.map((data: { id: number; name: string }) => {
                return (
                  // M - InnerHTML은 XSS 공격에 취약해 사용하면 안 된다!
                  // M - DOMPurify를 사용하면 되지만, npm audit 문제로 우선은 보류했다
                  <div
                    key={data.id}
                    className={styles['body-data']}
                    onClick={() => handleNavigate(data.id)}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: data.name }}
                    ></span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.warning}>
          <Warning></Warning>
          <span>데이터가 아직 준비되지 않았습니다</span>
        </div>
      </>
    )
  }
}

export default Table
