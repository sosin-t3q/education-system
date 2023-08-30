import { useSetRecoilState } from 'recoil'
import { currentModalAtom } from '@/atoms'

const useCurrentModal = () => {
    const setCurrentModal = useSetRecoilState(currentModalAtom)

    const closeCurrentModal = () => {
        setCurrentModal("")
    }

    return closeCurrentModal
}

export default useCurrentModal