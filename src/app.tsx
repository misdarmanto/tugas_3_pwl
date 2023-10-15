/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect } from 'react'
import { type IAppContextModel, useAppContext } from './context/app.context'
import AppRouters from './routers'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './configs/firebase.config'
import { Spinner } from '@material-tailwind/react'
import { type IUserModel } from './models/user'

const App = (): JSX.Element => {
  const { setCurrentUser, setIsLoading, isLoading }: IAppContextModel = useAppContext()

  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, async (user) => {
      if (user != null) {
        const payload: IUserModel | any = {
          userIsAuth: true,
          userId: user.uid,
          userName: user?.displayName ?? 'Admin',
          userEmail: user.email ?? '',
          userProfilePicture: user.photoURL
        }
        setCurrentUser(payload)
      }
    })
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-row h-screen items-center justify-center gap-2">
        <Spinner color="blue" className="h-12 w-12" /> Loading...
      </div>
    )
  }

  return <AppRouters />
}

export default App
