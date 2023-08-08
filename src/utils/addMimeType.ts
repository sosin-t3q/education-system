const addMimeType = (id: string, value: string) => {
  // 타입별로 분기처리
  const num = +id
  let result = ''

  const isPng =
    num === 5 ||
    num === 8 ||
    num === 21 ||
    num === 24 ||
    num === 25 ||
    num === 27 ||
    num === 28 ||
    num === 1204
  const isJpg =
    num === 6 ||
    num === 22 ||
    (num >= 101 && num <= 126) ||
    num === 1100 ||
    num === 1201 ||
    num === 1202 ||
    num === 1203 ||
    num === 1205
  const isJpeg = num === 7
  const isGif = num >= 14 && num <= 16

  const isWav = num === 9 || num === 11 || num === 12
  const isWavMidi = num === 10

  const isMp4 = num === 13 || num === 1101 || num === 1102

  switch (true) {
    case isPng:
      result = `data:image/png;base64,${value}`
      break
    case isJpg:
      result = `data:image/jpg;base64,${value}`
      break
    case isJpeg:
      result = `data:image/jpeg;base64,${value}`
      break
    case isGif:
      result = `data:image/gif;base64,${value}`
      break
    case isWav:
      result = `data:audio/wav;base64,${value}`
      break
    case isWavMidi:
      result = `data:audio/midi;base64,${value}`
      break
    case isMp4:
      result = `data:video/mp4;base64,${value}`
      break
    default:
      result = value
  }

  return result
}

export default addMimeType
