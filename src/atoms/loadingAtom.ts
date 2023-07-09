import { atom } from 'recoil'

const loadingAtom = atom({
  key: 'loading',
  default: false,
})

export default loadingAtom
