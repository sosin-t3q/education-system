import { useSetRecoilState } from 'recoil'
import { currentModalAtom } from '@/atoms'

const useCloseModal = () => {
    const setCurrentModal = useSetRecoilState(currentModalAtom)

    const closeModal = () => {
        setCurrentModal("")
    }

    return closeModal
}

export default useCloseModal