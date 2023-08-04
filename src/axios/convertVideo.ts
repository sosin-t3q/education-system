import axios from 'axios'

const convertVideo = async (videoArray: { name: string; data: string }[]) => {
  const url =
    'https://cors-anywhere.herokuapp.com/http://aihunmin-edu.t3q.ai:8181/api/converter/video'

  try {
    const convertedVideos = await Promise.all(
      videoArray.map(async video => {
        const jsonData = JSON.stringify({
          video_to_base64: video.data,
        })

        const res = await axios.post(url, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        })

        const resData = res.data
        return {
          name: video.name,
          data: resData.data,
        }
      }),
    )

    return convertedVideos
  } catch (e) {
    alert('비디오 변환 실패')
    return []
  }
}

export default convertVideo
