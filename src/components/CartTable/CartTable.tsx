import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { cartTableAtom, cartModalAtom } from '@/atoms'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import styles from './CartTable.module.css'

const CartTable = () => {
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)

  const navigate = useNavigate()

  useEffect(() => {
    // 서버로부터 데이터를 받아 cartTable에 넣어줌
    axios.get("http://localhost:5000/books")
      .then(res => {
        const data = res.data;
        setCartTable(data);
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

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
  } else {
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
}

export default CartTable
