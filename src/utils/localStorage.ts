import { CONFIG } from '../configs/app.config'
import { type IUserModel } from '../models/user'

export const getUserFromLocalStorage = (): IUserModel | null => {
  const user = localStorage.getItem(CONFIG.localStorageKey) ?? ''
  if (user.length === 0) return null
  const result: IUserModel = JSON.parse(user)
  return result
}
