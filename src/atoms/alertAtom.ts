import { atom } from 'recoil'

const alertAtom = atom({
  key: 'alertAtom',
  default: { visible: false, option: 'default' },
})

export default alertAtom
