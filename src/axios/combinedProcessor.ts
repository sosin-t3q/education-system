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
import { schoolProcessor } from '@/axios/school'
import { SetterOrUpdater } from 'recoil'
import { CancelTokenSource } from 'axios'

const combinedProcessor = (
  id: string | undefined,
  value: string | string[],
  apiURL: string,
  setLoading: SetterOrUpdater<boolean>,
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>,
  source: CancelTokenSource,
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
  const targetId = id ? +id : 0

  switch (true) {
    /* 훈민정음 예제일 때 (id 1~28) */
    case targetId >= 1 && targetId <= 28: {
      const tasks = ['classification', 'regression', 'anomaly', 'clustering']
      funcIndex = Math.floor((targetId - 1) / 4)
      taskIndex = (targetId - 1) % 4
      targetTask = tasks[taskIndex]

      return hunminArray[funcIndex](
        targetId,
        targetTask,
        value,
        apiURL,
        setLoading,
        setAlert,
        source,
      )
    }

    /* 비전 예제일 때 (id 101~199) */
    case targetId > 100 && targetId < 200: {
      return visionProcessor(
        targetId,
        value,
        apiURL,
        setLoading,
        setAlert,
        source,
      )
    }

    /* 학교 예제일 때 (id 1100~1299) */
    case targetId >= 1100 && targetId < 1300: {
      return schoolProcessor(
        targetId,
        value,
        apiURL,
        setLoading,
        setAlert,
        source,
      )
    }

    /* 정해지지않은 ID값이 들어오거나 ID값 호출이 잘못되었을 때 */
    default:
      // eslint-disable-next-line no-console
      console.log(
        'ID 값이 잘못되었거나 훈민정음 예제가 아닙니다. 현재 ID값 -> ',
        targetId,
      )

      return
  }
}

export default combinedProcessor
