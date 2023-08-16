import { SetterOrUpdater } from 'recoil'
import { NavigateFunction } from 'react-router-dom'
import Keycloak from 'keycloak-js'

//SetterOrUpdater은 useSetRecoilState에서 제공되는 함수 타입이다
//NavigateFunction은 navigate에서 제공되는 타입이다
//keycloak은 Keycloak의 인스턴스이기 때문에 Keycloak을 타입으로 제공해주면 된다

const handleNavigate = async (
  id: number,
  keycloak: Keycloak,
  setLoading: SetterOrUpdater<boolean>,
  navigate: NavigateFunction,
  setModal: SetterOrUpdater<boolean> | null = null,
) => {
  const isLoggedIn = keycloak.authenticated

  setLoading(true)
  if (!isLoggedIn) {
    if(setModal) {
      setModal(false)
    }

    try {
      await keycloak.login({
        redirectUri: `${window.location.origin}/detail/${id}`,
      })
    } catch (err) {
      alert('로그인에 실패했습니다.')
    }
    setLoading(false)
  } else {
    if(setModal) {
      setModal(false)
    }
    navigate(`/detail/${id}`)
    setLoading(false)
  }
}

export default handleNavigate
