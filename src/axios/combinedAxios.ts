import {
  audioAnomaly,
  audioClassification,
  audioClustering,
  audioRegression,
  binaryAnomaly,
  binaryClassification,
  binaryClustering,
  binaryRegression,
  imageAnomaly,
  imageClassification,
  imageClustering,
  imageRegression,
  logAnomaly,
  logClassification,
  logClustering,
  logRegression,
  satelliteAnomaly,
  satelliteClassification,
  satelliteClustering,
  satelliteRegression,
  textAnomaly,
  textClassification,
  textClustering,
  textRegression,
  videoAnomaly,
  videoClassification,
  videoClustering,
  videoRegression,
} from './case28'

// id=1인 함수부터 순서대로 미리 배열에 넣고
// props로 전달받은 id값을 배열 인덱스로 사용하여 호출합니다
const combinedFunction = (
  id: any,
  value: any,
  apiURL: any,
  setLoading: any,
) => {
  const functionArray = [
    textClassification,
    textRegression,
    textAnomaly,
    textClustering,
    imageClassification,
    imageRegression,
    imageAnomaly,
    imageClustering,
    audioClassification,
    audioRegression,
    audioAnomaly,
    audioClustering,
    videoClassification,
    videoRegression,
    videoAnomaly,
    videoClustering,
    logClassification,
    logRegression,
    logAnomaly,
    logClustering,
    satelliteClassification,
    satelliteRegression,
    satelliteAnomaly,
    satelliteClustering,
    binaryClassification,
    binaryRegression,
    binaryAnomaly,
    binaryClustering,
  ]

  if (id >= 1 && id <= functionArray.length) {
    const index = id - 1
    console.log(index)
    return functionArray[index](value, apiURL, setLoading)
  } else {
    console.log('ID ERROR')
    return
  }
}

export default combinedFunction
