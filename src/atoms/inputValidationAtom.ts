import { atom } from 'recoil'

interface InputValidation {
  type: string | null
  message: string | null
  isValid: boolean
}

const inputValidationAtom = atom<InputValidation>({
  key: 'inputValidation',
  default: { type: null, message: '데이터를 입력해주세요.', isValid: false },
})

export default inputValidationAtom
