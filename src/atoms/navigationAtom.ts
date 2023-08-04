import { atom } from 'recoil'

type Tab = 'introduce' | 'performance'

const navigationAtom = atom<Tab>({
  key: 'navigationAtom',
  default: 'introduce',
})

export default navigationAtom
