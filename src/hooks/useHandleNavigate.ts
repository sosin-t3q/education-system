Cookies
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useSetRecoilState } from 'recoil'
import { currentModalAtom, loadingAtom } from '@/atoms'
import Cookies from 'js-cookie'

const useHandleNavigate = () => {
  const setLoading = useSetRecoilState(loadingAtom)
  const setCurrentModal = useSetRecoilState(currentModalAtom)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  
  const checkAuthNavigation = async (id: number) => {
    setLoading(true)
    setCurrentModal("")
    
    //키클락 인증이 안 된 경우(로그아웃 상태)
    if (!keycloak.authenticated) {
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
      //키클락 인증이 된 경우(로그인 상태)
      navigate(`/detail/${id}`)
      setLoading(false)
    }
  }

  return checkAuthNavigation
}

export default useHandleNavigate
