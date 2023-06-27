const checkUserCookie = () => {
  if (
    document.cookie
      .split(';')
      .some(cookie => cookie.trim().startsWith('user_auth='))
  ) {
    // "user_auth" 쿠키에 값이 있는 경우
    console.log('user_auth 쿠키에 값이 있습니다.')
    return true
  } else {
    // "user_auth" 쿠키에 값이 없는 경우
    console.log('user_auth 쿠키에 값이 없습니다.')
    return false
  }
}

export default checkUserCookie
