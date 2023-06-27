const createUserCookie = (
  cookieName: string,
  cookieValue: string,
  daysToExpire: number,
) => {
  let cookie = cookieName + '=' + encodeURIComponent(cookieValue)

  if (daysToExpire) {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + daysToExpire)
    cookie += '; expires=' + expirationDate.toUTCString()
  }

  document.cookie = cookie + '; path=/'
  console.log('쿠키가 구워졌습니다')
}

export default createUserCookie

// 쿠키예시: createCookie("user_auth", "abcdef1234567890", 7);
