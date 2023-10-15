import { createContext, useContext, useReducer } from 'react'
import { type IUserModel } from '../models/user'
import { type IAppTypes } from '../models/app'

interface ErrorAppTypes {
  isError: boolean
  message: string
}

export interface IAppContextModel {
  appState: IAppTypes
  setAppState: (value: IAppTypes) => void
  currentUser: IUserModel
  setCurrentUser: (value: IUserModel) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  errorApp: ErrorAppTypes
  setErrorApp: (value: ErrorAppTypes) => void
}

export enum AppAction {
  APP_STATE = 'APP_STATE',
  CURRENT_USER = 'CURRENT_USER',
  IS_LOADING = 'IS_LOADING',
  ERROR_APP = 'ERROR_APP'
}

interface State {
  appState: IAppTypes | any
  currentUser: IUserModel | any
  isLoading: boolean | any
  errorApp: ErrorAppTypes | any
}

interface Action {
  type: AppAction
  payload?: State
}
type Dispatch = (action: Action) => void

interface AppContextType {
  state: State
  dispatch: Dispatch
}

export const AppContext = createContext<AppContextType | any>(undefined)

const appReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case AppAction.APP_STATE: {
      return { ...state, appState: action.payload?.appState }
    }
    case AppAction.CURRENT_USER: {
      return { ...state, currentUser: action.payload?.currentUser }
    }
    case AppAction.IS_LOADING: {
      return { ...state, isLoading: action.payload?.isLoading }
    }
    case AppAction.ERROR_APP: {
      return { ...state, errorApp: action.payload?.errorApp }
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const AppProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = useReducer(appReducer, {
    appState: { isAuth: false },
    currentUser: {
      userIsAuth: false,
      userId: '',
      userName: '',
      userEmail: '',
      userPhoneNumber: '',
      userProfilePicture: ''
    },
    errorApp: { isError: false, message: '' },
    isLoading: false
  })

  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = (): any => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return {
    ...context,
    ...context.state,
    setAppState: (value: IAppTypes) => {
      return context.dispatch({
        type: AppAction.APP_STATE,
        payload: {
          appState: value
        }
      })
    },
    setCurrentUser: (value: IUserModel) => {
      return context.dispatch({
        type: AppAction.CURRENT_USER,
        payload: {
          currentUser: value
        }
      })
    },
    setIsLoading: (value: boolean) => {
      return context.dispatch({
        type: AppAction.IS_LOADING,
        payload: {
          isLoading: value
        }
      })
    },
    setErrorApp: (value: ErrorAppTypes) => {
      return context.dispatch({
        type: AppAction.ERROR_APP,
        payload: {
          errorApp: value
        }
      })
    }
  }
}
