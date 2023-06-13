import styles from './ApiURL.module.css'

interface ApiURLProps {
  api: string
}

const ApiURL = ({ api }: ApiURLProps) => {
  return (
    <div className={styles.apiCont}>
      <label htmlFor="api-url">API URL</label>
      <input id="api-url" readOnly type="text" value={api} />
    </div>
  )
}

export default ApiURL
