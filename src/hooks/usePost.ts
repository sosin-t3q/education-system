import { useState, useEffect } from 'react'
import axios from 'axios'

const usePost = (url, data, config) => {
  // const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .post(url, data, config)
      .then(res => {
        //state를 만들고 prop으로 값을 전달해
        //setState()
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])
}

export default usePost
