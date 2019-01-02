import Cookies from 'js-cookie'

const TokenKey = 'CSADMINTOKEN'
const XTokenKey = 'X_Token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getXToken() {
  return Cookies.get(XTokenKey)
}

export function setXToken(xtoken) {
  return Cookies.set(XTokenKey, xtoken)
}

export function removeXToken() {
  return Cookies.remove(XTokenKey)
}
