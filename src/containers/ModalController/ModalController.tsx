import { useRecoilValue } from 'recoil';
import { currentModalAtom } from '@/atoms';
import { AI28Modal, CartModal, VisionModal } from '@/containers';


const ModalController = () => {
    const currentModal = useRecoilValue(currentModalAtom)

    switch (currentModal) {
      case "ai28":
        return <AI28Modal />
      case "vision":
        return <VisionModal />
      case "cart":
        return <CartModal />
      default:
        return null
    }
}

export default ModalController