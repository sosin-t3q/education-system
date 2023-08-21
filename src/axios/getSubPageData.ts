import { logKey, transformPillData } from '@/utils'
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
