import base64DataToFile from '@/axios/base64DataToFile'
import axios from 'axios'

const convertVideo = async (video: string, fileName: string) => {
  // 비디오는 base64 형식으로 받아온다
  const convertData = await base64DataToFile(video, fileName, 'video/avi')

  const formData = new FormData()
  formData.append('file', convertData)

  try {
    const convertRes = await axios.post(
      'http://aihunmin-edu.t3q.ai:8181/api/converter/video',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'json',
      },
    )
    const convertData = convertRes.data

    console.log(convertData)

    // 결과 비디오 src 문자열 반환
    return 'data:video/mp4;base64,' + convertData
  } catch (err) {
    console.log('비디오변환 실패')
  }
}

export default convertVideo
