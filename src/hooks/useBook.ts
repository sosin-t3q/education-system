// import axios from 'axios';
import { cartAtom, cartTableAtom, bookAtom, userIdAtom } from '@/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axiosInstance from '@/services/axiosInstance'

const useBook = () => {
  const cart = useRecoilValue(cartAtom)
  const userId = useRecoilValue(userIdAtom)
  const setBook = useSetRecoilState(bookAtom)
  const setCartTable = useSetRecoilState(cartTableAtom)

  // 확인하는 함수
  const checkBook = () => {
    axiosInstance
      .get(`/api/backend/custom_layer/${userId}`)
      .then(res => {
        const data = res.data
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
        alert('찜 목록을 불러오는데에 실패했습니다.')
      })
  }

  // 추가하는 함수
  const addBook = () => {
    setBook(true)
    axiosInstance
      .get(`/api/backend/append_interest/${userId}/${cart.id}`)
      .then(res => {
        //cart가 추가된 배열 데이터인 res.data가 들어옴
        const data = res.data
        //cartTable에 data 배열 값을 전달함
        setBook(true)
        setCartTable(data)
        alert('추가됐습니다!')
      })
      .catch(() => {
        alert('찜 추가에 실패했습니다.')
        setBook(false)
      })
  }

  //삭제하는 함수
  const deleteBook = () => {
    axiosInstance
      .get(`/api/backend/delete_interest/${userId}/${cart.id}`)
      .then(() => {
        setBook(false)
        alert('제거됐습니다!')
      })
      .catch(() => {
        alert('찜 제거에 실패했습니다.')
      })
  }

  return { checkBook, addBook, deleteBook }
}

export default useBook
