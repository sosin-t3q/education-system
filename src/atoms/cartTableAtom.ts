import { atom } from 'recoil'

interface atomInterface {
  id: number;
  title: string;
}

const cartTableAtom = atom<atomInterface[]>({
  key: 'cartTableAtom',
  default: [],
})

export default cartTableAtom
