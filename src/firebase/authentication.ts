import { AuthError, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

interface SignUpInterface {
  email: string
  password: string
}

export const signUp = async ({ email, password }: SignUpInterface) => {
  try {
    const signup = await createUserWithEmailAndPassword(auth, email, password)
    console.log(signup)
  } catch (e) {
    const error = e as AuthError
    console.log(error.code)
    console.log(error.message)
  }
}
