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
import { useState } from 'react'

interface DetailFormProps {
  api: string
}

const DetailForm = ({ api }: DetailFormProps) => {
  const targetName = '비디오 행동 분류'
  const target = json[json.findIndex(item => item.name === targetName)]
  const fileList = ['예제 선택하기', ...target.file.map(item => item.name)]
  const [selected, setSelected] = useState('default')
  const onChange = (selected: string) => {
    setSelected(selected)
  }

  return (
    <div className={styles.container}>
      <Title
        type={2}
        label={'예제 실행해보기'}
        className={'detailform-title'}
      />

      <ApiURL api={api} />
      <div className={styles['input-cont']}>
        <Input file={target.file} type={target.type} selected={selected} />
        <Result />
      </div>
      <DropdownMenu options={fileList} onSelect={onChange} />
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
