import { atom } from 'recoil'

const RecordAtom = atom({
  key: 'RecordAtom',
  default: {
    recording: false,
    base64: '',
  },
})

export default RecordAtom
