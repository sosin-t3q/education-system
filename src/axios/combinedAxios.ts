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
import {
  knu1100,
  knu1101,
  knu1102,
  ku1200,
  ku1201,
  ku1202,
  ku1203,
  ku1204,
  ku1205,
} from './school'
import {
  detectronDetection,
  maskrcnnSegmentation,
  mobilenetClassification,
  sampleCode,
  scaledyolov4Detection,
  segformerSegmentation,
  vitClassification,
  yolorDetection,
  yolosDetection,
  yolov3KerasDetection,
  yolov3torchDetection,
  yolov4TinyDetection,
  yolov5Classification,
  yolov5Detection,
  yolov5Segmentation,
  yolov6Detection,
  yolov7Detection,
  yolov7Segmentation,
  yolov8Classification,
  yolov8Detection,
  yolov8Segmentation,
  yoloxDetection,
} from './vision'

// id=1인 함수부터 순서대로 미리 배열에 넣고
// props로 전달받은 id값을 배열 인덱스로 사용하여 호출합니다
const combinedFunction = (
  id: any,
  value: any,
  apiURL: any,
  setLoading: any,
) => {
  if (id >= 1 && id <= 28) {
    // 훈민정음 case 28일 때 (id 1~28)
    const hunminIndex = id - 1
    let hunminFuncArray = [
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
    return hunminFuncArray[hunminIndex](value, apiURL, setLoading)
  } else if (id > 100 && id < 200) {
    // vision 예제일 때 (id 101~199)
    const visionIndex = id - 101
    let visionFuncArray = [
      // 탐지(detection)
      yolov8Detection,
      sampleCode,
      sampleCode,
      yolov7Detection,
      sampleCode,
      yolov6Detection,
      yolov5Detection,
      yolosDetection,
      yolov3KerasDetection,
      yoloxDetection,
      yolorDetection,
      yolov3torchDetection,
      // 분할(division)
      yolov8Segmentation,
      yolov7Segmentation,
      yolov5Segmentation,
      maskrcnnSegmentation,
      segformerSegmentation,
      // 분류(classification)
      yolov8Classification,
      yolov5Classification,
      sampleCode,
      vitClassification,
      mobilenetClassification,
      // 더보기(etc)
      yolov4TinyDetection,
      yolov4TorchDetection,
      scaledyolov4Detection,
      detectronDetection,
    ]
    return visionFuncArray[visionIndex](value, apiURL, setLoading)
  } else if (id >= 1100 && id < 1200) {
    // 경북대학교 예제일 때 (id 1100~1199)
    const kyungpookIndex = id - 1100
    let kyungpookFuncArray = [knu1100, knu1101, knu1102]
    return kyungpookFuncArray[kyungpookIndex](value, apiURL, setLoading)
  } else if (id >= 1100 && id < 1200) {
    // 고려대학교 예제일 때 (id 1200~1299)
    const koreaIndex = id - 1200
    let koreaFuncArray = [ku1200, ku1201, ku1202, ku1203, ku1204, ku1205]
    return koreaFuncArray[koreaIndex](value, apiURL, setLoading)
  } else {
    console.log('ID ERROR')
    return
  }
}

export default combinedFunction
