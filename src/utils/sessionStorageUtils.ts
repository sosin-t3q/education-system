// sessionStorageUtils.ts

export const getSessionStorage = (): string => {
  return sessionStorage.getItem('selectedSchool') || ''
}

export const setSessionStorage = (school: string): void => {
  sessionStorage.setItem('selectedSchool', school)
}
