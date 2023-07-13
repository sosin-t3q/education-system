import { atom } from 'recoil'

const resultAtom = atom<boolean>({
  key: 'resultAtom',
  default: false,
})

export default resultAtom
