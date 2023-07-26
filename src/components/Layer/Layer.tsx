import data from '@/data/LAYERS_DATA.json'
import styles from './Layer.module.css'
import { tableAtom } from '@/atoms'
import { useSetRecoilState } from 'recoil'
import DOMPurify from 'dompurify';

interface LayerDataProps {
  id: number
  name: string
}

const Layer = ({ className }: {className: string}) => {
  const setTable = useSetRecoilState(tableAtom)

  let body = data[0].body

  return (
    <div
      className={`${className} ${styles.Layer}`}
      onClick={() => {
        setTable('전국민 AI')
      }}
    >
      <h3 className={styles.title}>전국민 AI</h3>
      <div className={styles['block-container']}>
        {body?.map((data: LayerDataProps) => {
          //XSS 공격을 예방하기 위해 DOMPurify로 데이터를 정화했다
          const cleanHTML = DOMPurify.sanitize(data.name);

          return (
            // M - 렌더링이 되어도 빈 값인 데이터들이 많아 id값이 제대로 전달되지 않을 것들이 있음!
            <div key={data.id} className={styles.block}>
              <span
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
              ></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Layer
