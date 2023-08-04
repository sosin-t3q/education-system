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
  setModal: SetterOrUpdater<boolean>,
  navigate: NavigateFunction,
) => {
  // const isLoggedIn = keycloak.authenticated;

  // setLoading(true);
  //   if (!isLoggedIn) {
  //     setModal(false);
  //     try {
  //       await keycloak.login({ redirectUri: window.location.origin + `/detail/${id}` });
  //     } catch (error) {
  //       console.log("로그인 실패!");
  //     }
  //     setLoading(false);
  //   } else {
  //     setModal(false);
  //     navigate(`/detail/${id}`)
  //     setLoading(false);
  //   }
  setLoading(true)
  setModal(false)
  navigate(`/detail/${id}`)
  setLoading(false)
}

export default handleNavigate
