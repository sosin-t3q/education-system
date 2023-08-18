import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useSetRecoilState, SetterOrUpdater } from 'recoil'
import { loadingAtom } from '@/atoms'

const useHandleNavigate = () => {
  const setLoading = useSetRecoilState(loadingAtom)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const userAuth = Cookies.get("user_auth")
  
  const checkAuthNavigation = async (id: number, setModal: SetterOrUpdater<boolean>) => {
    setLoading(true)
    setModal(false)

    //쿠키에 userAuth가 없을 경우
    if (!userAuth) {
      try {
        // 키클락 로그인 페이지로 이동시킨 후 로그인 성공 시에 접근하려던 상세페이지로 이동
        await keycloak.login({
          redirectUri: `${window.location.origin}/detail/${id}`,
        })
      } catch (err) {
        alert('로그인에 실패했습니다.')
      } finally {
        setLoading(false)
      }
    } else {
      //쿠키에 userAuth가 있을 경우에는 상세페이지로 바로 이동
      navigate(`/detail/${id}`)
      setLoading(false)
    }
  }

  return checkAuthNavigation
}

export default useHandleNavigate
