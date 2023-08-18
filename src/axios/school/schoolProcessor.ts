/* eslint-disable max-depth */
import axiosRequest from '@/axios/axiosRequest'
import base64DataToFile from '@/axios/base64DataToFile'
import { SetterOrUpdater } from 'recoil'
import json from '@/data/SCHOOL_INFERENCE.json'

let convertDataA: File, convertDataB: File

const getInputType = async (inputType: string, value: string) => {
  switch (inputType) {
    case 'image/jpeg':
      return await base64DataToFile(value, 'image', 'image/jpeg')
    case 'image/png':
      return await base64DataToFile(value, 'image', 'image/png')
    case 'audio/wav':
      return await base64DataToFile(value, 'audio', 'audio/wav')
    case 'audio/midi':
      return await base64DataToFile(value, 'audio', 'audio/midi')
    case 'image/gif':
      return await base64DataToFile(value, 'image', 'image/gif')
    case 'video/mp4':
      return await base64DataToFile(value, 'video', 'video/mp4')
    case 'doubleJpeg': {
      const imageA = value[0]
      const imageB = value[1]
      convertDataA = await base64DataToFile(imageA, 'imageA', 'image/jpeg')
      convertDataB = await base64DataToFile(imageB, 'imageB', 'image/jpeg')
      break
    }
    default:
      return null
  }
}

const getApiType = (
  targetId: any,
  apiType: string,
  value: string,
  formUrl: string,
  convertFile: File | null | undefined,
) => {
  switch (apiType) {
    case 'text':
      return JSON.stringify({
        url: formUrl,
        word: value,
        detail_id: targetId,
      })

    case 'log':
      return JSON.stringify({
        url: formUrl,
        log_data: value,
        detail_id: targetId,
      })

    case 'files': {
      const formData = new FormData()
      formData.append('url', formUrl)
      formData.append('files', convertDataA)
      formData.append('files', convertDataB)
      formData.append('detail_id', targetId)

      return formData
    }

    default: {
      const formData = new FormData()
      if (convertFile) {
        formData.append('url', formUrl)
        formData.append('file', convertFile)
        formData.append('detail_id', targetId)
      }

      return formData
    }
  }
}

const schoolProcessor = async (
  targetId: number,
  value: string | string[],
  formUrl: string,
  setLoading: SetterOrUpdater<boolean>,
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>,
) => {
  const targetSchool = json.schools.find(school => school.id === targetId)
  const apiType = targetSchool?.axios || 'default'
  const inputType = targetSchool?.inputType || 'default'
  const returnType = targetSchool?.returnType || false
  const dataInfo = targetSchool?.dataInfo
  let resultData = ''

  const convertFile = await getInputType(inputType, value as string)
  const convertData = getApiType(
    targetId,
    apiType,
    value as string,
    formUrl,
    convertFile,
  )

  setLoading(true)

  try {
    const json = await axiosRequest(convertData, apiType)
    if (json.res === 'true') {
      let response_data = json.response.data
      if (response_data == null) {
        response_data = json.response.inference
      }

      switch (targetId) {
        case 1100:
        case 1205: // 정상작동
          resultData = `data:image/jpg;base64,${response_data}`
          break

        case 1101:
        case 1102:
          resultData = `data:video/mp4;base64,${response_data}`
          break

        case 1103:
          resultData = response_data[0].replaceAll('\n', '<br>')
          break
        case 1200: // 에러
          {
            const response_arr = []
            const response_rlt = []

            if (response_data == 'There is no data') {
              response_arr.push('해당 단어를 찾을 수 없습니다.')
            } else if (
              response_data[0]['negative'] > response_data[0]['neutral'] &&
              response_data[0]['negative'] > response_data[0]['postive']
            ) {
              response_arr.push('부정')
            } else if (
              response_data[0]['neutral'] > response_data[0]['postive']
            ) {
              response_arr.push('중립')
            } else {
              response_arr.push('긍정')
            }

            for (let i = 1; i < 6; i++) {
              response_arr.push(response_data[i][0])
            }

            if (json.res == 'true') {
              if (response_arr[0] == '해당 단어를 찾을 수 없습니다.') {
                resultData = response_arr[0]
              } else if (response_arr[0] != '해당 단어를 찾을 수 없습니다.') {
                for (let i = 1; i < response_arr.length; i++) {
                  response_rlt.push(` ${response_arr[i]}`)
                }
                resultData = `이 단어는 ${response_arr[0]}적인 단어입니다. <br>연관어로는 ${response_rlt}이(가) 있습니다.`
              }
            }
          }
          break

        case 1201: // 에러
          resultData = `data:image/jpg;base64,${response_data}`
          break

        case 1202: // 정상작동
          {
            const res_score = []
            let resultValue = ''
            for (const data_for in response_data[0]) {
              res_score.push(response_data[0][data_for]['SCORE'])
            }
            const res_max_data = Math.max.apply(null, res_score)
            for (const data_for in response_data[0]) {
              if (response_data[0][data_for]['SCORE'] == res_max_data) {
                resultValue = response_data[0][data_for]
              }
            }
            resultData = `
              알약명: ${resultValue.NAME} <br>
              색상: ${resultValue.COLOR} <br>
              모양: ${resultValue.MY}
                `
          }
          break

        case 1203: // 정상작동
          {
            const response_arr = []
            const response_rlt = []
            if (response_data[0]['대분류'] == 0) {
              response_arr.push('침대')
              for (
                let i = 1;
                i < Object.entries(response_data[0]).length;
                i++
              ) {
                if (Object.entries(response_data[0])[i][1] != 0) {
                  response_rlt.push(
                    ` ${Object.entries(response_data[0])[i][0]}`,
                  )
                }
              }
            } else if (response_data[0]['대분류'] == 1) {
              response_arr.push('의자')
              for (
                let i = 2;
                i < Object.entries(response_data[0]).length;
                i++
              ) {
                if (Object.entries(response_data[0])[i][1] == 0) {
                  response_rlt.push(
                    ` ${Object.entries(response_data[0])[i][0]}`,
                  )
                }
              }
              const resultIndex: number = Object.entries(response_data[0])[0][1]
              response_rlt.push(` ${dataInfo[resultIndex]}`)
            }

            if (json.res == 'true') {
              resultData = `이 이미지는 ${response_arr}입니다. <br> 속성으로는 ${response_rlt}이(가) 있습니다.`
            }
          }
          break

        case 1204: // 정상작동
          resultData =
            response_data == 'natural image'
              ? '진짜 얼굴'
              : response_data == 'fake image'
              ? '가짜 얼굴'
              : '반환값 없음'
          break

        case 1206: // 서버에 api 주소 없음
          console.log('response_data =', response_data)
          break

        case 1207: // HTTPConnectionPool
          console.log('value = ', value)
          console.log('response_data =', response_data)
          break

        case 1208: // 500 에러
          console.log('response_data =', response_data)
          break

        case 1209: // HTTPConnectionPool
          console.log('response_data =', response_data)
          break

        default:
          console.log(
            '지정하지 않은 예제 return 값 확인 response_data =',
            response_data,
          )
          break
      }
    }
  } catch (err) {
    setAlert({ visible: true, option: 'axiosError' })

    return
  } finally {
    setLoading(false)
  }

  if (returnType) {
    return resultData
  }

  return { label: resultData }
}

export default schoolProcessor
