import styles from './CartLayer.module.css'
import data from "@/data/TEST.json";
import {useState, useEffect} from "react";

interface CartLayerProps {
  className?: string
}

interface CartLayerDataProps {
  id: number
  title: string
}

const CartLayer = ({ className }: CartLayerProps) => {
  //blocks는 최대 크기가 28인 빈 배열이다
  const [blocks, setBlocks] = useState(new Array(28).fill(null));

  useEffect(() => {
    //서버로 들어온 값과 비교해 blocks 배열을 갱신하는 코드
    setBlocks(blocks.map((block, index) => data[index] || block));
  }, [])

  return (
    <div className={`${className} ${styles.Layer}`}>
      <h3 className={styles.title}>개인 AI</h3>
      <div className={styles['block-container']}>
        {blocks?.map((block: CartLayerDataProps, index) => {
          return (
            <div key={index} className={styles.block}>
              {/* block에 데이터가 있으면 렌더링이 된다 */}
              <span className={styles.content}>{block && block.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartLayer
