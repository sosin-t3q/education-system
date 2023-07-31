const createDataObject = (keys: string[], dataString: string) => {
  const dataArray = dataString.split(',')

  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i] = dataArray[i].replace(/"/g, '')
  }

  const dataObject: { [key: string]: string } = {}

  for (let i = 0; i < keys.length; i++) {
    dataObject[keys[i]] = dataArray[i]
  }

  return dataObject
}

const logKey = (id: string, value: string) => {
  let keys: string[] = []

  switch (id) {
    case '17':
      keys = [
        'FULL_NAME',
        'TEAM',
        'POS',
        'AGE',
        'GP',
        'MPG',
        'MIN',
        'USG',
        'FTA',
        'FT',
        'PA2',
        'P2',
        'PA3',
        'P3',
        'TS',
        'PPG',
        'RPG',
        'TRB',
        'APG',
        'AST',
        'SPG',
        'BPG',
        'VI',
      ]
      break
    case '18':
      keys = [
        'FULL_NAME',
        'TEAM',
        'POS',
        'AGE',
        'GP',
        'MPG',
        'MIN',
        'USG',
        'FTA',
        'FT',
        'PA2',
        'P2',
        'PA3',
        'P3',
        'TS',
        'PPG',
        'RPG',
        'TRB',
        'APG',
        'SPG',
        'BPG',
      ]
      break
    case '19':
      keys = [
        'V1',
        'V2',
        'V3',
        'V4',
        'V5',
        'V6',
        'V7',
        'V8',
        'V9',
        'V10',
        'V11',
        'V12',
        'V13',
        'V14',
        'V15',
        'V16',
        'V17',
        'V18',
        'V19',
        'V20',
        'V21',
        'V22',
        'V23',
        'V24',
        'V25',
        'V26',
        'V27',
        'V28',
        'Amount',
      ]
      break
    case '20':
      keys = [
        'Name',
        'HP',
        'ATTACK',
        'DEFENCE',
        'SP_ATTACK',
        'SP_DEFENCE',
        'SPEED',
      ]
      break
    case '23':
      keys = [
        'ID',
        'V0',
        'V1',
        'V2',
        'V3',
        'V4',
        'V5',
        'V6',
        'V7',
        'V8',
        'V9',
        'V10',
        'V11',
        'V12',
        'V13',
        'V14',
        'V15',
        'V16',
        'V17',
        'V18',
        'V19',
        'V20',
        'V21',
        'V22',
        'V23',
        'V24',
        'V25',
        'V26',
        'V27',
        'V28',
        'V29',
        'V30',
        'V31',
        'V32',
        'V33',
        'V34',
        'V35',
      ]
      break
    case '26':
      keys = [
        'hash',
        'millisecond',
        'state',
        'usage_counter',
        'prio',
        'static_prio',
        'normal_prio',
        'policy',
        'vm_pgoff',
        'vm_truncate_count',
        'task_size',
        'cached_hole_size',
        'free_area_cache',
        'mm_users',
        'map_count',
        'hiwater_rss',
        'total_vm',
        'shared_vm',
        'exec_vm',
        'reserved_vm',
        'nr_ptes',
        'end_data',
        'last_interval',
        'nvcsw',
        'nivcsw',
        'min_flt',
        'maj_flt',
        'fs_excl_counter',
        'lock',
        'utime',
        'stime',
        'gtime',
        'cgtime',
        'signal_nvcsw',
      ]
      break
  }

  return createDataObject(keys, value)
}

export default logKey
