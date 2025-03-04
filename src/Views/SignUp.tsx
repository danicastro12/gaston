import { useForm } from "react-hook-form"
import { getIdTokenResult } from "firebase/auth"
import { Link, useNavigate } from "react-router"
import { auth } from "../firebase/firebase"
import { useAuthContext } from "../context/AuthContext"

export const SignUp = () => {
  interface Form {
    email: string
    password: string
    money: string
  }

  const { registerAction } = useAuthContext()

  const nav = useNavigate()
  const { register, handleSubmit } = useForm<Form>()

  const onSubmit = async (data: Form) => {
    const user = await registerAction({
      auth,
      email: data.email,
      password: data.password,
      money: data.money,
    })

    if (user) {
      const token = await getIdTokenResult(user)
      localStorage.setItem("token", token.token)
      nav("/dashboard")
    }
  }

  return (
    <div className="w-screen max-w-full h-screen max-h-screen flex justify-center items-center">
      <form
        className="flex justify-center w-72  h-2/3 items-center flex-col p-12 gap-10 bg-gray-800 rounded-md text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="email"
          className="w-5/6 h-8 rounded-sm p-2"
          placeholder="Email"
        ></input>
        <input
          {...register("password")}
          type="password"
          className="w-5/6 h-8 rounded-sm p-2"
          placeholder="Contraseña"
        />
        <input
          {...register("money")}
          type="number"
          className="w-5/6 h-8 rounded-sm p-2"
          placeholder="Dinero inicial"
        ></input>
        <button className="bg-gray-900 p-4 rounded-md text-white">
          Registrarse
        </button>

        <Link
          className="text-white text-sm bg-emerald-600 rounded-md p-2"
          to="/login"
        >
          Iniciar Sesion
        </Link>
      </form>
    </div>
  )
}
