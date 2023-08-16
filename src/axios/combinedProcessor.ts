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

import { visionProcessor } from '@/axios/vision'

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

const combinedProcessor = (
  id: string | undefined,
  value: string | string[],
  apiURL: string,
  setLoading: SetterOrUpdater<boolean>,
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>,
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

      return hunminArray[funcIndex](
        targetTask,
        value,
        apiURL,
        setLoading,
        setAlert,
      )
    }
    case targetId > 100 && targetId < 200: {
      // 비전 예제일 때 (id 101~199)
      return visionProcessor(
        targetId,
        value,
        apiURL,
        setLoading,
        setAlert,
      )
    }

    case targetId >= 1100 && targetId < 1200: {
      // 경북대학교 예제일 때 (id 1100~1199)

      const kyungpookIndex = targetId - 1100
      const kyungpookFuncArray = [knu1100, knu1101, knu1102]

      return kyungpookFuncArray[kyungpookIndex](value, apiURL, setLoading)
    }
    case targetId < 1300: {
      // 고려대학교 예제일 때 (id 1200~1299)

      const koreaIndex = targetId - 1200
      const koreaFuncArray = [ku1200, ku1201, ku1202, ku1203, ku1204, ku1205]

      return koreaFuncArray[koreaIndex](value, apiURL, setLoading)
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
