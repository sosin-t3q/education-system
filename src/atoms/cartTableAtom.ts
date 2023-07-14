import { atom } from 'recoil'

const cartTableAtom = atom<any[]>({
  key: 'cartTable',
  default: [],
})

export default cartTableAtom
