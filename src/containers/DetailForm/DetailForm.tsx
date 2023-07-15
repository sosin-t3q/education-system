import {
  Title,
  ApiURL,
  Input,
  // Result,
  Button,
  DropdownMenu,
} from '@/components'
import styles from './DetailForm.module.css'
import { useCallback, useEffect, useState } from 'react'
import { detailDataAtom, resultAtom, loadingAtom } from '@/atoms/index'
import { useRecoilState, useSetRecoilState } from 'recoil'
import textClassification from '@/axios/text_classification'
// import axios from "axios";

interface DetailFormProps {
  data: any
}

const DetailForm = ({ data }: DetailFormProps) => {
  const [selected, setSelected] = useState('default')
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [value, setValue] = useRecoilState<any>(detailDataAtom)
  const fileList = data &&
    data['case_data'] && [
      '예제 선택하기',
      ...data['case_data'].map((item: any) => item.name),
    ]

    //진우가 추가한 코드
    const setLoading = useSetRecoilState(loadingAtom);
    const setResult = useSetRecoilState(resultAtom);

  const onChange = useCallback(
    (selected: string) => {
      setSelected(selected)
    },
    [setSelected],
  )

  useEffect(() => {
    if (data && data.type === 'draw') {
      setSelectedFile(
        (data !== null &&
          data['case_data']?.filter(
            (item: any) => item.name === selected,
          )[0]) ||
          'draw',
      )
      return
    } else if (data && data.type === 'write') {
      setSelectedFile(
        (data !== null &&
          data['case_data']?.filter(
            (item: any) => item.name === selected,
          )[0]) ||
          'write',
      )
      return
    }

    setSelectedFile(
      (data !== null &&
        data['case_data']?.filter((item: any) => item.name === selected)[0]) ||
        'default',
    )
  }, [selected, data])

  const onClick = useCallback(() => {
    if (value) {
      textClassification(value, setLoading, setResult);
    } else {
      alert('데이터를 입력해주세요.')
    }
  }, [value])

  const getInputData = useCallback((data: any) => {
    setValue(data)
  }, [])

  return (
    <div className={styles.container}>
      <Title
        type={2}
        label={'예제 실행해보기'}
        className={'detailform-title'}
      />
      <ApiURL api={data && data.API} />
      <div className={styles['input-cont']}>
        {data && <Input selected={selectedFile} getData={getInputData} />}
        {/* <Result infer={infer} /> */}
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
