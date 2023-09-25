/* eslint-disable no-prototype-builtins */
export default function transformPillData(
  dataArray: { name: string; data: string }[],
) {
  const groupedData: { name: string; data: string[] }[] = []
  const pillData: { [key: string]: string[] } = {}

  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i]
    const index = Math.floor(i / 2)

    if (!pillData[index]) {
      pillData[index] = []
    }

    pillData[index].push(item.data)
  }

  for (const index in pillData) {
    if (pillData.hasOwnProperty(index)) {
      const pillName = `PillData${parseInt(index) + 1}`
      groupedData.push({ name: pillName, data: pillData[index] })
    }
  }

  return groupedData
}
