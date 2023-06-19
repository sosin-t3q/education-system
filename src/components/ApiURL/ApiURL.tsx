import { useState } from 'react'
import styles from './ApiURL.module.css'

interface ApiURLProps {
  api: string
}

const ApiURL = ({ api }: ApiURLProps) => {
  const [apiURL, setApiURL] = useState<string>(api)
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
