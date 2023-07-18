import {useState, useEffect} from "react";
import styles from './CartLayer.module.css'
// import axios from 'axios';
import data from "@/data/TEST.json";

interface CartLayerProps {
  className?: string
}

interface CartLayerDataProps {
  id: number
  title: string
}

const CartLayer = ({ className }: CartLayerProps) => {
  //blocks는 최대 크기가 28인 비어있는 배열이다
  const [blocks, setBlocks] = useState(new Array(28).fill(null));

  useEffect(() => {
    setBlocks(blocks.map((block, index) => data[index] || block));
    // axios.get(url)
    // .then(res => {
    //   //서버에서 값이 들어오면, data에 담는다
    //   let data = res.data;
    //   //업데이트를 할 때 map()을 사용해 data[index]에 값이 있다면 추가하고 없으면 block을 유지한다
    //   setBlocks(blocks.map((block, index) => data[index] || block));
    //   })
    //   .catch(err => {
    //     console.log(err.message);
    //   })
  }, [])

  return (
    <div className={`${className} ${styles.Layer}`}>
      <h3 className={styles.title}>개인 AI</h3>
      <div className={styles['block-container']}>
        {blocks?.map((block: CartLayerDataProps, index) => {
          return (
            // block에 데이터가 있으면 렌더링이 된다
            <div key={block ? `${block.id}`: `key-${index}` } className={styles.block}>
              <span className={styles.content}>{block && block.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartLayer
