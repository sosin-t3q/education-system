import { atom } from 'recoil'

const isLoggedInAtom = atom({
  key: 'isLoggedInAtom',
  default: false,
})

export default isLoggedInAtom
