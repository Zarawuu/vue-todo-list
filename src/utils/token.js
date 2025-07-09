import { STORAGE_KEY } from '@/constants'

const getToken = () => {
  return localStorage.getItem(STORAGE_KEY)
}

const setToken = (token) => {
  localStorage.setItem(STORAGE_KEY, token)
  return token
}

const removeToken = () => {
  return localStorage.removeItem(STORAGE_KEY)
}

export { getToken, setToken, removeToken }