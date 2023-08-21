import Cookies from 'js-cookie'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import axiosInstance from '@/services/axiosInstance'
import { cartAtom, cartTableAtom, bookAtom, alertAtom } from '@/atoms'

const useBook = () => {
  const [cartTable, setCartTable] = useRecoilState(cartTableAtom)

  const cart = useRecoilValue(cartAtom)

  const setBook = useSetRecoilState(bookAtom)
  const setAlert = useSetRecoilState(alertAtom)

  const userAuth = Cookies.get("user_auth");

  // 장바구니 확인하는 함수
  const checkBook = async () => {

    if(userAuth) { //사용자 로그인 유무 확인
      try {
        const userId = JSON.parse(userAuth).user_id //쿠키값에서 고유식별자ID값 저장

        const result = await axiosInstance.get(`/api/backend/custom_layer/${userId}`) //개인AI 배열 데이터 호출
        const data = result.data //호출된 배열 데이터 저장

        //장바구니 최댓값 비교를 위해 호출된 배열 데이터 cartTable에 저장
        setCartTable([...data])

        const isBook = data.some(
          (item: { id: number }) => item.id === cart.id,
        )
  
        setBook(isBook) //책갈피 아이콘 색변경
      } catch (error) {
        setAlert({ visible: true, option: 'cartError' });
      }
    }
  }

  // 장바구니 추가하는 함수
  const addBook = async () => {
    setBook(true) //장바구니 아이콘의 색을 채운다

    if(userAuth) {
        try {
          const userId = JSON.parse(userAuth).user_id //쿠키값에서 고유식별자ID값 저장

          await axiosInstance.get(`/api/backend/append_interest/${userId}/${cart.id}`) //개인AI에 데이터 추가 통신

          if (cartTable.length >= 28) {
            setAlert({visible: true, option: 'cartMaxError'}) //개인AI 안의 예제가 28개 이상이면 초과했다고 알려준다
          } else {
            setAlert({visible: true, option: 'cartAdd'}) //개인AI에 예제 추가가 성공하면 추가됐다고 알려준다
          }
        } catch (error) {
          setBook(false) // 장바구니 아이콘 색을 지운다
          setAlert({visible: true, option: 'cartError'}) //개인AI 추가 실패 경고창이 뜬다
        }
      }
    }

  //삭제하는 함수
  const deleteBook = async () => {
    setBook(false) //장바구니 아이콘의 색을 지운다

    if(userAuth) {
      try {
        const userId = JSON.parse(userAuth).user_id //쿠키값에서 고유식별자ID값 저장

        await axiosInstance.get(`/api/backend/delete_interest/${userId}/${cart.id}`) //개인AI에 데이터 삭제 통신

        setAlert({visible: true, option: 'cartRemove'})
      } catch (error) {
        setBook(true) //장바구니 아이콘의 색을 채운다
        setAlert({visible: true, option: 'cartError'})
      }
    }
  }

  return { checkBook, addBook, deleteBook }
}

export default useBook
