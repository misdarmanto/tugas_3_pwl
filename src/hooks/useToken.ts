import { useState } from 'react'

const useToken = (): any => {
  const LOCAL_STORAGE_KEY = 'simerdeka'
  const getToken = (): any => {
    const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (tokenString != null) {
      return tokenString
    } else {
      return null
    }
  }

  const [token, setToken] = useState<string | null>(getToken())

  const saveToken = (userToken: string): any => {
    localStorage.setItem(LOCAL_STORAGE_KEY, userToken)
    setToken(userToken)
  }

  const removeToken = (): any => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
    getToken
  }
}

export default useToken
