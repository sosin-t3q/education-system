import { useState, useEffect } from 'react'
import styles from './CartLayer.module.css'
import { userIdAtom, alertAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axiosInstance from '@/services/axiosInstance'

interface CartLayerProps {
  className?: string
}

interface CartLayerDataProps {
  id: number
  title: string
}

const CartLayer = ({ className }: CartLayerProps) => {
  //blocks는 최대 크기가 28인 비어있는 배열이다
  const [blocks, setBlocks] = useState(new Array(28).fill(null))
  const userId = useRecoilValue(userIdAtom)
  const setAlert = useSetRecoilState(alertAtom)

  useEffect(() => {
    if (userId) {
      // 서버에서 장바구니 데이터를 불러온다
      axiosInstance
        .get(`/api/backend/custom_layer/${userId}`)
        .then(res => {
          const data = res.data
          //setBlocks로 blocks를 업데이트할 때 data[index]에 값이 있다면 block에 추가하고 없으면 비어있는 block을 유지한다
          setBlocks(blocks.map((block, index) => data[index] || block))
        })
        .catch(() => {
          setAlert({visible: true, option: 'cartError'})
        })
    }
  }, [userId])

  return (
    <div className={`${className} ${styles.Layer}`}>
      <h3 className={styles.title}>개인 AI</h3>
      <div className={styles['block-container']}>
        {blocks?.map((block: CartLayerDataProps, index) => {
          return (
            // block에 데이터가 있으면 렌더링이 된다.
            <div
              key={block ? `${block.id}` : `key-${index}`}
              className={styles.block}
            >
              <span className={styles.content}>{block && block.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartLayer
