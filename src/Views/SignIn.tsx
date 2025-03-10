import { useForm } from "react-hook-form"
import { getIdTokenResult } from "firebase/auth"
import { useNavigate } from "react-router"
import { auth } from "../firebase/firebase"
import { useAuthContext } from "../context/AuthContext"
export const SignIn = () => {
  interface Form {
    email: string
    password: string
  }

  const { loginAction } = useAuthContext()

  const nav = useNavigate()
  const { register, handleSubmit } = useForm<Form>()

  const onSubmit = async (data: Form) => {
    const user = await loginAction({
      auth,
      email: data.email,
      password: data.password,
    })

    if (user) {
      const token = await getIdTokenResult(user)
      localStorage.setItem("token", token.token)
      nav("/dashboard")
    }
  }

  return (
    <div className="w-screen max-w-full h-screen max-h-screen flex flex-col justify-center items-center ">
      <h2 className="font-bold text-2xl pb-6">Bienvenido de nuevo!</h2>
      <form
        className="flex justify-center w-72  h-2/3 items-center flex-col p-12 gap-16 bg-gray-800 text-black rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="email"
          className="w-56 h-8 rounded-sm p-2"
          placeholder="Email"
        ></input>
        <input
          {...register("password")}
          type="password"
          className="w-56 h-8 rounded-sm p-2"
          placeholder="Contraseña"
        />
        <button className="bg-gray-900 p-4 rounded-md text-white">
          Iniciar Sesion
        </button>
      </form>
    </div>
  )
}
