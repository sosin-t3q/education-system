// base64DataToFile은 인자로 base64형식의 데이터, 파일명, 밈타입을 받는다
// base64를 blob으로 변환한 다음, 최종적으로 File 객체로 만드는 코드다
const base64DataToFile = async (
  base64Data: any,
  filename: string,
  mimeType: string,
) => {
  let fetchResponse = await fetch(base64Data)
  let blob = await fetchResponse.blob()

  let file = new File([blob], filename, { type: mimeType })
  return file
}

export default base64DataToFile

// let file = await base64ToFile(base64Image, "image.jpg", "image/jpeg");
// let videoFile = await base64ToFile(base64Video, "video.mp4", "video/mp4");
// let audioFile = await base64ToFile(base64Audio, "audio.mp3", "audio/mpeg");

// ---

// const base64ToFile = async (base64Data, mimeType) => {
//   let fetchResponse = await fetch(base64Data);
//   let blob = await fetchResponse.blob();

//   let file = new File([blob], "", { type: mimeType });
//   return file;
// };
