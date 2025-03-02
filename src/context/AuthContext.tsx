import {
  Auth,
  AuthError,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"
import React, { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log(user)
      }
    })
  }, [])
  const [user, setUser] = useState<User>()

  const registerAction = async ({
    auth,
    email,
    password,
  }: RegisterInterface): Promise<User> => {
    console.log(email)
    console.log(password)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(user)
      const userRef = doc(firestore, "users", user.uid)

      await setDoc(userRef, {
        spents: [],
      })

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
