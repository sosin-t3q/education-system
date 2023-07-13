import { atom } from 'recoil'

const cartAtom = atom<any>({
  key: 'cartAtom',
  default: null,
})

export default cartAtom
