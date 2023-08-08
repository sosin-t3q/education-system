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
}

const fetchData = async (
  id: string,
  setLoading: SetterOrUpdater<boolean>,
): Promise<DataType | null> => {
  setLoading(true)

  try {
    const response = await axiosInstance.get(`/api/backend/subpage/${id}`)
    const res = response.data
    let newData: DataType | null = null

    const caseData = res['case_data']['data_list'].map((item: any) => ({
      ...item,
      data: logKey(id, item.data),
    }))

    const data = await convertVideo(res['case_data']['data_list'])

    const transformData = transformPillData(res['case_data']['data_list'])

    switch (true) {
      case res['case_data']['data_type'] === 'log':
        newData = { ...res['case_data'], data_list: caseData }
        break
      case id === '13':
        newData = { ...res['case_data'], data_list: data }
        break
      case id === '1202':
        newData = { ...res['case_data'], data_list: transformData }

        break
      default:
        newData = res['case_data']
    }

    return newData
  } catch (e) {
    alert('상세페이지 데이터를 불러오는데 실패했습니다.')

    return null
  } finally {
    setLoading(false)
  }
}

export default fetchData
