import {
  Auth,
  AuthError,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"
import React, { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

type AuthContextType = {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  registerAction: ({
    auth,
    email,
    password,
  }: RegisterInterface) => Promise<User> | void

  loginAction: ({
    auth,
    email,
    password,
  }: RegisterInterface) => Promise<User> | void
}

interface RegisterInterface {
  auth: Auth
  email: string
  password: string
}

const authContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
  registerAction: () => {},
  loginAction: () => {},
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    }
  }, [])
  const [user, setUser] = useState<User>()

  const registerAction = async ({
    auth,
    email,
    password,
  }: RegisterInterface): Promise<User> => {
    console.log(auth)
    console.log(email)
    console.log(password)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(user)
      setUser(user)
      return user
    } catch (e) {
      const error = e as AuthError
      console.log(error.code)
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  const loginAction = async ({
    auth,
    email,
    password,
  }: RegisterInterface): Promise<User> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      setUser(user)
      return user
    } catch (e) {
      const error = e as AuthError
      console.log(error.code)
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  return (
    <authContext.Provider
      value={{ user, setUser, registerAction, loginAction }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = () => {
  if (!authContext) {
    throw new Error("Context must be in a provider")
  }
  return useContext(authContext)
}
