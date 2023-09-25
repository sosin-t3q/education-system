import { atom } from 'recoil'
import { InputType } from '@/containers/DetailForm/DetailForm'

const detailDataAtom = atom<InputType>({
  key: 'detailData',
  default: null,
})

export default detailDataAtom
