import DOMPurify from 'dompurify';
import styles from './AI28Layer.module.css'
import data from '@/data/layers/AI28_LAYER.json'

interface DataProps {
  id: number
  name: string
}

const AI28Layer = ({ className }: {className: string}) => {
  const { body } = data;

  return (
    <div className={`${className} ${styles.Layer}`}>
      <h3 className={styles.title}>전국민 AI</h3>
      <div className={styles['block-container']}>
        {
          body.map((data: DataProps) => {
            const cleanHTML = DOMPurify.sanitize(data.name);

            return (
              <div key={data.id} className={styles.block}>
                <span
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: cleanHTML }}
                ></span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AI28Layer
