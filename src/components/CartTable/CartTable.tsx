import styles from './CartTable.module.css'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { cartTableAtom, cartModalAtom } from '@/atoms'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Warning } from '@/assets/warning.svg'
import data from '@/data/TEST.json'
// import axios from 'axios'

const CartTable = () => {
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)
  const setCartModal = useSetRecoilState(cartModalAtom)

  const navigate = useNavigate()

  useEffect(() => {
    setCartTable(data)
    // 서버로부터 데이터를 받아 cartTable에 넣어줌
    // axios
    //   .get(url, data, config)
    //   .then(res => {
    //     const data = res.data;
    //     setCartTable(data);
    //   })
    //   .catch(err => {
    //     console.log(err.message)
    //   })
  }, [cartTable])

  const handleNavigate = (id: number) => {
    setCartModal(false)
    navigate(`/detail/${id}`)
  }

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
