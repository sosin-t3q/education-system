import { logKey, transformPillData } from '@/utils'
import { convertVideo } from '@/axios'
import axios from 'axios'

export interface DataType {
  API: string
  data_list: DataListType[]
  data_type: string
}

export type DataListType = {
  [key: string]: string
}

const fetchData = async (id: string): Promise<DataType | null> => {
  try {
    const response = await axios.get(
      `http://aihunmin-edu.t3q.ai:8181/api/backend/subpage/${id}`,
    )
    const res = response.data
    let newData: DataType | null = null

    if (res['case_data']['data_type'] === 'log') {
      const caseData = res['case_data']['data_list'].map((item: any) => ({
        ...item,
        data: logKey(id, item.data),
      }))
      newData = { ...res['case_data'], data_list: caseData }
    } else if (id === '13') {
      const data = await convertVideo(res['case_data']['data_list'])
      newData = { ...res['case_data'], data_list: data }
    } else if (id === '1202') {
      const transformData = transformPillData(res['case_data']['data_list'])
      newData = { ...res['case_data'], data_list: transformData }
    } else {
      newData = res['case_data']
    }

    return newData
  } catch (e) {
    return null
  }
}

export default fetchData
