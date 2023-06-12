import { Title, ApiURL, Input, Result, Button } from '@/components'
import styles from './DetailForm.module.css'

interface DetailFormProps {
  api: string
}

const DetailForm = ({ api }: DetailFormProps) => {
  return (
    <div className={styles.container}>
      <Title
        type={2}
        label={'예제 실행해보기'}
        className={'detailform-title'}
      />
      <ul className={styles.inputUl}>
        <li>
          1.{` `}
          <a href={api} download className={styles['detailform-Api']}>
            여기
          </a>
          를 클릭해 추론 데이터를 다운받으세요.
        </li>
        <li>
          2. 다운받은 추론 데이터를 선택한 다음, 예제에 넣고 실행해보세요.
        </li>
      </ul>
      <ApiURL api={api} />
      <div className={styles['input-cont']}>
        <Input />
        <Result />
      </div>
      <Button
        option={1}
        label={'추론하기'}
        onClick={() => {}}
        className="button--input"
      />
    </div>
  )
}

export default DetailForm
