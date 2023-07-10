import { atom } from 'recoil'

const loadingAtom = atom<boolean>({
  key: 'loadingAtom',
  default: false,
})

export default loadingAtom
