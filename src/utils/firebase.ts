import { getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { auth } from '../configs/firebase.config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'

interface IFirebaseResetPasswordModel {
  email: string
}

export const firebaseResetPassword = async (
  props: IFirebaseResetPasswordModel
): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, props.email)
  } catch (error: any) {
    const errorMessage = error.message
    throw Error(errorMessage)
  }
}

export const uploadImageToFirebase = async ({ imageRef, file }: any): Promise<any> => {
  const snapshot = await uploadBytesResumable(imageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  return url
}

export const signOutFirebase = async (): Promise<void> => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error: any) => {
      throw error
    })
}

export const signInFirebase = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result)
      //   const token = credential?.accessToken
      //   // The signed-in user info.
      const user = result.user

      console.log(user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      //   const errorCode = error.code
      //   const errorMessage = error.message
      //   // The email of the user's account used.
      //   const email = error.email
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
      throw error
    })
}
