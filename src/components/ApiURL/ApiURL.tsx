import { useEffect } from 'react'
import styles from './ApiURL.module.css'
import { useRecoilState } from 'recoil'
import { loadingAtom } from '@/atoms'

interface ApiURLProps {
  api: string | null
  apiURL: string
  setApiURL: React.Dispatch<React.SetStateAction<string>>
}

const ApiURL = ({ api, apiURL, setApiURL }: ApiURLProps) => {
  const loading = useRecoilState(loadingAtom)

  useEffect(() => {
    if (api) {
      setApiURL(api)
    } else if (loading) {
      setApiURL('api url 로딩중입니다.')
    } else {
      setApiURL('api url 로드에 실패했습니다.')
    }
  }, [api])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiURL(e.target.value)
  }

  return (
    <div className={styles.apiCont}>
      <label className={styles.apiLabel} htmlFor="api-url">
        API URL
      </label>
      <input
        className={styles.apiInput}
        id="api-url"
        type="text"
        value={apiURL}
        onChange={onChange}
      />
    </div>
  )
}

export default ApiURL
