import axios from 'axios'

const convertVideo = async (base64: string) => {
  const url =
    'https://cors-anywhere.herokuapp.com/http://aihunmin-edu.t3q.ai:8181/api/converter/video'

  const jsonData = JSON.stringify({
    video_to_base64: base64,
  })

  try {
    const res = await axios.post(url, jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    })

    console.log('통신 요청 들어감')
    const resData = res.data

    return 'data:video/mp4;base64,' + resData.data
  } catch (e) {
    console.log('변환 실패', e)
  }
}

export default convertVideo
