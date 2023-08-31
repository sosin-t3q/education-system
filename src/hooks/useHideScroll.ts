import {useEffect} from 'react'
import { useRecoilValue } from 'recoil'
import { currentModalAtom } from '@/atoms'

const useHideScroll = () => {
    const currentModal = useRecoilValue(currentModalAtom)

    useEffect(() => {
        if (currentModal) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }

        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [currentModal])
}

export default useHideScroll