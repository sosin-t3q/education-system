// base64DataToFile은 인자로 base64형식의 데이터, 파일명, 밈타입을 받는다
// base64를 blob으로 변환한 다음, 최종적으로 File 객체로 만드는 코드다
const base64DataToFile = async (
  base64Data: any,
  filename: string,
  mimeType: string,
) => {
  const fetchResponse = await fetch(base64Data)
  const blob = await fetchResponse.blob()

  const file = new File([blob], filename, { type: mimeType })

  return file
}

export default base64DataToFile
