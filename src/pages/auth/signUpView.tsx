/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
  CardFooter
} from '@material-tailwind/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../configs/firebase.config'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type IUserRegisterPostRequestModel } from '../../models/user'
import { type IAppContextModel, useAppContext } from '../../context/app.context'
import { firebaseCRUD } from '../../firebase/firebaseFunctions'

const SignUpInView = (): JSX.Element => {
  const { currentUser, setCurrentUser, setIsLoading, setErrorApp }: IAppContextModel =
    useAppContext()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  useEffect(() => {
    if (currentUser.userIsAuth) {
      navigate('/')
    }
  }, [currentUser.userIsAuth])

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      )

      const payload: IUserRegisterPostRequestModel = {
        userId: userCredential.user.uid,
        userName,
        userEmail,
        userPassword,
        userProfilePicture: userCredential.user.photoURL
      }

      await firebaseCRUD.createData({ collectionName: 'USERS', data: payload })

      setCurrentUser({ ...payload, userIsAuth: true })
      navigate('/')
      location.reload()
    } catch (error: any) {
      setErrorApp({ isError: true, ...error })
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <div className="flex items-center h-screen justify-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="User name"
            size="lg"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
          <Input
            label="Email"
            type="email"
            size="lg"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value)
            }}
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value)
            }}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Sudah punya account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUpInView
