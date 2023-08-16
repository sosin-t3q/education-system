import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import axiosInstance from '@/services/axiosInstance'
import styles from './CartTable.module.css'
import { cartTableAtom, cartModalAtom, userIdAtom, isModalOpenAtom, loadingAtom } from '@/atoms'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import { handleNavigate } from '@/utils';
import { useKeycloak } from '@react-keycloak/web'
import { useNavigate } from 'react-router-dom'


const CartTable = () => {
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom)
  const userId = useRecoilValue(userIdAtom)
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const setLoading = useSetRecoilState(loadingAtom)

  useEffect(() => {
    if (userId) {
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
          alert('데이터를 불러오는데 실패했습니다.')
        })
    }
  }, [userId])

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
                      handleNavigate(
                        data.id,                    
                        keycloak,
                        setLoading,
                        navigate,
                        setCartModal
                        )
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
        <Warning></Warning>
        <span>데이터를 추가해주세요!</span>
      </div>
    </>
  )
}

export default CartTable
