import {
  Title,
  ApiURL,
  Input,
  Result,
  Button,
  DropdownMenu,
} from '@/components'
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

      <ApiURL api={api} />
      <div className={styles['input-cont']}>
        <Input />
        <Result />
      </div>
      <DropdownMenu />
      <Button
        option={1}
        label={'추론하기'}
        onClick={() => {}}
        className={`${styles['button--input']}`}
      />
    </div>
  )
}

export default DetailForm
