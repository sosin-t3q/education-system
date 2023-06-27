import {
  Title,
  ApiURL,
  Input,
  Result,
  Button,
  DropdownMenu,
} from '@/components'
import styles from './DetailForm.module.css'
import json from '@/data/DETAIL_DATA.json'
import { useCallback, useState } from 'react'

interface DetailFormProps {
  pageId: string | undefined
}

const DetailForm = ({ pageId }: DetailFormProps) => {
  const [selected, setSelected] = useState('default')
  const [infer, setInfer] = useState('')
  const target = json[json.findIndex(item => String(item.id) === pageId)]
  const fileList = target.file && [
    '예제 선택하기',
    ...target.file.map(item => item.name),
  ]

  const onChange = useCallback(
    (selected: string) => {
      setSelected(selected)
    },
    [setSelected],
  )

  const onClick = () => {
    // TODO: 추론하기 버튼 클릭 시, 추론 결과 받아오기
    setInfer('추론 결과')
  }

  return (
    <div className={styles.container}>
      <Title
        type={2}
        label={'예제 실행해보기'}
        className={'detailform-title'}
      />

      <ApiURL api={target.API!} />
      <div className={styles['input-cont']}>
        {target.file ? (
          <Input target={target} selected={selected} />
        ) : (
          <Input target={target} />
        )}
        <Result infer={infer} />
      </div>
      {fileList && <DropdownMenu options={fileList} onSelect={onChange} />}
      <Button
        option={1}
        label={'추론하기'}
        onClick={onClick}
        className={`${styles['button--input']}`}
      />
    </div>
  )
}

export default DetailForm
