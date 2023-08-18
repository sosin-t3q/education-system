import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import DOMPurify from 'dompurify'
import data from '@/data/layers/AI28_LAYER.json'
import styles from './Table.module.css'
import { AI28ModalAtom, loadingAtom, isModalOpenAtom } from '@/atoms'
import { handleNavigate } from '@/utils'

const Table = () => {
  const setModal = useSetRecoilState(AI28ModalAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  const { title, columns, rows, body } = data

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.table}>
        <div className={styles.columns}>
          {
            /* 테이블 헤더 */
            columns.map(column => {
              return (
                <div key={column.id} className={styles['column-data']}>
                  <span className={styles['column-text']}>{column.header}</span>
                </div>
              )
            })
          }
        </div>

        <div className={styles.container}>
          <div className={styles.rows}>
            {
              /* 사이드 헤더 */
              rows.map(row => {
                return (
                  <div key={row.id} className={styles['row-data']}>
                    <span>{row.side}</span>
                  </div>
                )
              })
            }
          </div>
          <div className={styles.body}>
            {
              /* 바디 데이터 */
              body.map(data => {
                //<br>을 사용하기 위해 dangerouslySetInnerHTML을 사용했다.
                //dangerouslySetInnerHTML을 사용으로 인한 XSS 공격을 방지하기 위해 DOMPurify를 사용했다.
                const cleanHTML = DOMPurify.sanitize(data.name)

                return (
                  <div
                    key={data.id}
                    className={styles['body-data']}
                    onClick={() => {
                        setIsModalOpen(false)
                        handleNavigate(
                          data.id,
                          keycloak,
                          setLoading,
                          navigate,
                          setModal
                        )
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: cleanHTML }}
                    ></span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Table
