import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/error-page'
import HomeView from '../pages/home/homeView'
import MyProfileView from '../pages/myProfile/myProfileView'
import MyProfileEditView from '../pages/myProfile/myProfileEditView'
import LoginView from '../pages/auth/loginView'
import { type IAppContextModel, useAppContext } from '../context/app.context'
// import SignUpView from '../pages/auth/signUpView'
// import ResetPasswordView from '../pages/auth/resetPasswordView'
import AppLayout from '../layout/appLayout'

export default function AppRouters(): JSX.Element {
  const { currentUser }: IAppContextModel = useAppContext()

  const routerAuth: Array<{ path: string; element: JSX.Element }> = [
    {
      path: '/',
      element: <LoginView />
    },
    {
      path: '/login',
      element: <LoginView />
    }
    // {
    // 	path: "/sign-up",
    // 	element: <SignUpView />,
    // },
    // {
    // 	path: "/reset-password",
    // 	element: <ResetPasswordView />,
    // },
  ]

  const routerMain: Array<{ path: string; element: JSX.Element }> = [
    {
      path: '/',
      element: <HomeView />
    },

    {
      path: '/my-profile',
      element: <MyProfileView />
    },
    {
      path: '/my-profile/edit',
      element: <MyProfileEditView />
    }
  ]

  let router: Array<{ path: string; element: JSX.Element }> = []

  if (currentUser.userIsAuth) {
    router = routerMain
  } else {
    router = routerAuth
  }

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: router
    }
  ])

  return <RouterProvider router={routers} />
}
