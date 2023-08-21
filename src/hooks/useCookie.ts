import { useKeycloak } from '@react-keycloak/web'
import Cookies from 'js-cookie';

const useCookie = () => {

    const { keycloak } = useKeycloak();

    // 사용자 쿠키 생성
    const createUserCookie = () => {
        if(keycloak.authenticated) {
            const authData = {
                access_token: keycloak.token,
                refresh_token: keycloak.refreshToken,
                id_token: keycloak.idToken,
                user_id: keycloak.idTokenParsed?.sub,
            }

            // 'user_auth'라는 쿠키를 생성
            Cookies.set('user_auth', JSON.stringify(authData), { expires: 1 })
        }
    }

    //사용자 쿠키 확인
    // const checkUserCookie = () => {
    //     const userCookie = Cookies.get("user_auth")
        
    //     if(userCookie) {
    //         return true
    //     } else {
    //         false
    //     }
    // }

    // const getUserId = () => {
    //     const userCookie = Cookies.get("user_auth")

    //     if(userCookie) {
    //         const userId = JSON.parse(userCookie).user_id
    //         return userId;
    //     } 
    // }

    return { createUserCookie }
}

export default useCookie