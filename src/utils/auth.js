import { LOCALSTORAGE_KEY } from '@/constants/business-key'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'

const TokenKey = LOCALSTORAGE_KEY.TOKEN

export function getToken() {
  return getLocalStorage(TokenKey)
}

export function setToken(token) {
  return setLocalStorage(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
