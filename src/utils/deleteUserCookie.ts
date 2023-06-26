const deleteUserCookie = () => {
  // 사용자 쿠키의 유효기간을 만료시킴
  document.cookie =
    'user_auth' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  console.log('쿠키가 부서졌습니다')
}

export default deleteUserCookie
