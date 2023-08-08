import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './CartTable.module.css'
import { cartTableAtom, cartModalAtom, userIdAtom } from '@/atoms'
import { ReactComponent as Warning } from '@/assets/warning.svg'

const CartTable = () => {
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)
  const userId = useRecoilValue(userIdAtom)

  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      // 서버로부터 데이터를 받아 cartTable에 넣어줌
      axios
        .get(
          `http://aihunmin-edu.t3q.ai:8181/api/backend/custom_layer/${userId}`,
        )
        .then(res => {
          const data = res.data
          setCartTable(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [userId])

  //페이지 이동 함수
  const handleNavigate = (id: number) => {
    setCartModal(false)
    navigate(`/detail/${id}`)
  }

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
                    onClick={() => handleNavigate(data.id)}
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
