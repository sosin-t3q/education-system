import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './CartTable.module.css'
import axiosInstance from '@/services/axiosInstance'
import useHandleNavigate from '@/hooks/useHandleNavigate'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import { cartTableAtom, isModalOpenAtom, alertAtom } from '@/atoms'
import { getUserAuthCookie } from '@/utils'

const CartTable = () => {
  const setAlert = useSetRecoilState(alertAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)

  const checkAuthNavigation = useHandleNavigate();

  const userAuth = getUserAuthCookie()

  useEffect(() => {
    if (userAuth) {
      const userId = JSON.parse(userAuth).user_id
      // 서버로부터 데이터를 받아 cartTable에 넣어줌
      axiosInstance
        .get(
          `/api/backend/custom_layer/${userId}`,
        )
        .then(res => {
          const data = res.data
          setCartTable(data)
        })
        .catch(() => {
          setAlert({visible: true, option: 'cartError'})
        })
    }
  }, [userAuth])

  // cartTable은 빈 배열을 가지고 있기 때문에, 배열의 길이로 렌더링 조건을 설정했다
  if (cartTable.length > 0) {
    return (
      <>
        <h2 className={styles.title}>개인 AI</h2>
        <div className={styles.table}>
          <div className={styles.container}>
            {/* cartTableAtom에 서버로부터 저장된 데이터가 들어오면 값이 추가가 된다 */}
            <div className={styles.body}>
              {cartTable?.map((data: { id: number; title: string }) => {
                return (
                  <div
                    key={data.id}
                    className={styles['body-data']}
                    onClick={() => {
                      setIsModalOpen(false);
                      checkAuthNavigation(data.id)
                    }}
                  >
                    <span>{data.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className={styles.title}>개인 AI</h2>
      <div className={styles.warning}>
        <Warning />
        <span>개인 AI에 데이터가 추가되지 않습니다</span>
      </div>
    </>
  )
}

export default CartTable
