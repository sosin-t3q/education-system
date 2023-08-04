import { logKey, transformPillData } from '@/utils'
import { convertVideo } from '@/axios'
import axios from 'axios'
import { SetterOrUpdater } from 'recoil'

export interface DataType {
  API: string
  data_list: DataListType[]
  data_type: string
}

export type DataListType = {
  [key: string]: string
}

const fetchData = async (
  id: string,
  setLoading: SetterOrUpdater<boolean>,
): Promise<DataType | null> => {
  setLoading(true)

  try {
    const response = await axios.get(
      `http://aihunmin-edu.t3q.ai:8181/api/backend/subpage/${id}`,
    )
    const res = response.data
    let newData: DataType | null = null

    switch (true) {
      case res['case_data']['data_type'] === 'log':
        const caseData = res['case_data']['data_list'].map((item: any) => ({
          ...item,
          data: logKey(id, item.data),
        }))
        newData = { ...res['case_data'], data_list: caseData }
        break
      case id === '13':
        const data = await convertVideo(res['case_data']['data_list'])
        newData = { ...res['case_data'], data_list: data }
        break
      case id === '1202':
        const transformData = transformPillData(res['case_data']['data_list'])
        newData = { ...res['case_data'], data_list: transformData }

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
