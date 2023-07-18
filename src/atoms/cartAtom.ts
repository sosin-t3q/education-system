import { atom } from 'recoil'

interface atomInterface {
  id: number;
  title: string | undefined;
}

const cartAtom = atom<atomInterface>({
  key: 'cartAtom',
  default: { id: 0, title: "" }
})

export default cartAtom
