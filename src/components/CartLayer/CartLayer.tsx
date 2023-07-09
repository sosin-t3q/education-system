import styles from './CartLayer.module.css'

interface CartLayerProps {
  className?: string
}

interface CartLayerDataProps {
  id: number
  name: string
}

let data = new Array(28)
  .fill(0)
  .map((_, index) => ({ id: index + 1, name: '' }))

const CartLayer = ({ className }: CartLayerProps) => {
  return (
    <div className={`${className} ${styles.Layer}`}>
      <h3 className={styles.title}>개인 AI</h3>
      <div className={styles['block-container']}>
        {data?.map((item: CartLayerDataProps) => {
          return (
            // M - 렌더링이 되어도 빈 값인 데이터들이 많아 id값이 제대로 전달되지 않을 것들이 있음!
            <div key={item.id} className={styles.block}>
              <span
                className={styles.content}
                // M - InnerHTML은 XSS 공격에 취약해 사용하면 안 된다!
                // M - DOMPurift를 사용하면 되지만, npm audit 문제로 우선은 보류했다
                dangerouslySetInnerHTML={{ __html: item.name }}
              ></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CartLayer
