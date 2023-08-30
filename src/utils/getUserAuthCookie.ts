import Cookies from 'js-cookie'

const getUserAuthCookie = () => {
    const userAuth = Cookies.get("user_auth")

    return userAuth
}

export default getUserAuthCookie