import { atom } from 'recoil'

const alertAtom = atom({
  key: 'alertAtom',
  default: { visible: false, option: 0 },
})

export default alertAtom
