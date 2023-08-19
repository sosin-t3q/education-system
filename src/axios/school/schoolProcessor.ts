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
  targetId: string | number, // 타입 어떤걸로 할지 수정
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
        case 1102: // 정상작동
          resultData = `data:video/mp4;base64,${response_data}`
          break

        case 1103: // 500 에러, PPT 자료 없음
          resultData = response_data[0].replaceAll('\n', '<br>')
          break
        case 1200: // 추론 안되게 처리완료
          // 동작 중지
          break

        case 1201: // 정상작동
          response_data = json.response.image
          resultData = `data:image/jpg;base64,${response_data}`
          break

        case 1202: // 샘플 3번 정상작동, 샘플 1번 2번 받아오는 이미지 오류
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
          response_data = json.response
          for (const i in response_data) {
            console.log(`${i} : ${response_data[i]}`)
          }

          resultData = response_data

          break

        case 1209: // HTTPConnectionPool
          console.log('response_data =', response_data)
          break

        default:
          return setAlert({ visible: true, option: 'IDError' })
          break
      }
    }
  } catch (err) {
    if (targetId == 1200) {
      return setAlert({ visible: true, option: 'DBError' })
    }

    return setAlert({ visible: true, option: 'axiosError' })

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
