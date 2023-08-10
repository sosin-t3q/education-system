import { SetterOrUpdater } from 'recoil'
import {
  audioProcessor,
  binaryProcessor,
  imageProcessor,
  logProcessor,
  satelliteProcessor,
  textProcessor,
  videoProcessor,
} from '@/axios/case28'

const combinedProcessor = (
  id: string | undefined,
  value: string,
  apiURL: string,
  setLoading: SetterOrUpdater<boolean>,
) => {
  const hunminArray = [
    textProcessor,
    imageProcessor,
    audioProcessor,
    videoProcessor,
    logProcessor,
    satelliteProcessor,
    binaryProcessor,
  ]
  let funcIndex = 0
  let taskIndex: number
  let targetTask: string
  const targetId = +id // string으로 받아온 id 값을 number타입으로 변환하기 위함

  switch (true) {
    case targetId >= 1 && targetId <= 28: {
      // 훈민정음 예제일 때 (id 1~28)
      const tasks = ['classification', 'regression', 'anomaly', 'clustering']
      funcIndex = Math.floor((targetId - 1) / 4)
      taskIndex = (targetId - 1) % 4
      targetTask = tasks[taskIndex]

      return hunminArray[funcIndex](targetTask, value, apiURL, setLoading)
    }

    default:
      console.log(
        'ID 값이 잘못되었거나 훈민정음 예제가 아닙니다. 현재 ID값 -> ',
        targetId,
      )

      return
  }
}

export default combinedProcessor

// case id > 100 && id < 200:
//   // 비전 예제일 때 (id 101~199)
//   console.log('VISION, id = ', id)
//   const visionIndex = id - 101
//   let visionFuncArray = [
//     yolov8Detection,
//     sampleCode,
//     sampleCode,
//     yolov7Detection,
//     sampleCode,
//     yolov6Detection,
//     yolov5Detection,
//     yolosDetection,
//     yolov3KerasDetection,
//     yoloxDetection,
//     yolorDetection,
//     yolov3torchDetection,
//     yolov8Segmentation,
//     yolov7Segmentation,
//     yolov5Segmentation,
//     maskrcnnSegmentation,
//     segformerSegmentation,
//     yolov8Classification,
//     yolov5Classification,
//     sampleCode,
//     vitClassification,
//     mobilenetClassification,
//     yolov4TinyDetection,
//     yolov4TorchDetection,
//     scaledyolov4Detection,
//     detectronDetection,
//   ]
//   return visionFuncArray[visionIndex](value, apiURL, setLoading)

// case id >= 1100 && id < 1200:
//   // 경북대학교 예제일 때 (id 1100~1199)
//   console.log('경북대학교, id = ', id)
//   const kyungpookIndex = id - 1100
//   let kyungpookFuncArray = [knu1100, knu1101, knu1102]
//   return kyungpookFuncArray[kyungpookIndex](value, apiURL, setLoading)

// case id < 1300:
//   // 고려대학교 예제일 때 (id 1200~1299)
//   console.log('고려대학교, id = ', id)
//   const koreaIndex = id - 1200
//   let koreaFuncArray = [ku1200, ku1201, ku1202, ku1203, ku1204, ku1205]
//   return koreaFuncArray[koreaIndex](value, apiURL, setLoading)
