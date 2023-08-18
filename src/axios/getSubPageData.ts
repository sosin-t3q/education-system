import { logKey, transformPillData } from '@/utils'
import { convertVideo } from '@/axios'
import axiosInstance from '@/services/axiosInstance'
import { SetterOrUpdater } from 'recoil'

export type DataListType = {
  [key: string]: string
}
export interface DataType {
  API: string
  data_list: DataListType[]
  data_type: string
  original_data_list: DataListType[]
}

const fetchData = async (
  id: string,
  setLoading: SetterOrUpdater<boolean>,
  setAlert: SetterOrUpdater<{ visible: boolean; option: string }>, // 알림창 컴포넌트 상태관리
): Promise<DataType | null> => {
  setLoading(true)

  try {
    const response = await axiosInstance.get(`/api/backend/subpage/${id}`)
    const res = response.data
    let newData: DataType | null = null

    switch (true) {
      case res['case_data']['data_type'] === 'log':
        {
          const caseData = res['case_data']['data_list'].map(
            (item: DataListType) => ({
              ...item,
              data: logKey(id, item.data),
            }),
          )
          newData = { ...res['case_data'], data_list: caseData }
        }
        break
      case id === '13' || id === '1207':
        {
          const data = await convertVideo(
            res['case_data']['data_list'],
            setAlert,
          )
          newData = {
            ...res['case_data'],
            data_list: data,
          }
        }
        break
      case id === '1202':
        {
          const transformData = transformPillData(res['case_data']['data_list'])
          newData = { ...res['case_data'], data_list: transformData }
        }
        break
      default:
        newData = res['case_data']
    }

    return newData
  } catch (e) {
    return null
  } finally {
    setLoading(false)
  }
}

export default fetchData
