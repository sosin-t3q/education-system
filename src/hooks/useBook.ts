import { cartAtom, cartTableAtom, bookAtom, userIdAtom, alertAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axiosInstance from '@/services/axiosInstance'

const useBook = () => {
  const cart = useRecoilValue(cartAtom)
  const userId = useRecoilValue(userIdAtom)
  const setBook = useSetRecoilState(bookAtom)
  const setCartTable = useSetRecoilState(cartTableAtom)
  const cartTable = useRecoilValue(cartTableAtom)
  const setAlert = useSetRecoilState(alertAtom)

  // 확인하는 함수
  const checkBook = () => {
    axiosInstance
      .get(`/api/backend/custom_layer/${userId}`)
      .then(res => {
        const data = res.data
        //장바구니 데이터를 cartTable로 업데이트 시킨다
        setCartTable([...data])
        //cart.id에는 상세페이지의 id가 들어있는데, 이 값이 이미 data 배열 안에 있다면 book의 값은 true, 아니면 false다
        const isBook = data.some(
          (item: { id: number; title: string }) => item.id === cart.id,
        )
        if (isBook) {
          setBook(true)
        } else {
          setBook(false)
        }
      })
      .catch(() => {
        // alert('장바구니 데이터를 불러오지 못했습니다')
        setAlert({visible: true, option: 'cartError'})
      })
  }

  // 추가하는 함수
  const addBook = () => {
    setBook(true)
    axiosInstance
      .get(`/api/backend/append_interest/${userId}/${cart.id}`)
      .then(() => {
        setBook(true)
        if (cartTable.length >= 28) {
          setAlert({visible: true, option: 'cartMaxError'})
        } else {
          setAlert({visible: true, option: 'cartAdd'})
        }
      })
      .catch(() => {
        setAlert({visible: true, option: 'cartError'})
        setBook(false)
      })
  }

  //삭제하는 함수
  const deleteBook = () => {
    axiosInstance
      .get(`/api/backend/delete_interest/${userId}/${cart.id}`)
      .then(() => {
        setBook(false)
        setAlert({visible: true, option: 'cartRemove'})
      })
      .catch(() => {
        setAlert({visible: true, option: 'cartError'})
      })
  }

  return { checkBook, addBook, deleteBook }
}

export default useBook
