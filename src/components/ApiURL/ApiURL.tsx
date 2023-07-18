import { useEffect } from 'react'
import styles from './ApiURL.module.css'

interface ApiURLProps {
  api: string | null
  apiURL: string;
  setApiURL: any;
}

const ApiURL = ({ api, apiURL, setApiURL }: ApiURLProps) => {

  useEffect(() => {
    if (api) {
      setApiURL(api)
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
