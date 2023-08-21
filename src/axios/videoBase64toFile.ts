const videoBase64toFile = async (
  base64Data: string,
  filename: string,
  mimeType: string,
): Promise<File> => {
  const decodedData = new Uint8Array(
    [...atob(base64Data)].map(char => char.charCodeAt(0)),
  )

  const blob = new Blob([decodedData], { type: mimeType })

  return new File([blob], filename, { type: mimeType })
}

export default videoBase64toFile
