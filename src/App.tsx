import { useEffect, useState } from "react"
import "./App.css"
import { jwtDecode } from "jwt-decode"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "./firebase/firebase"
import { useNavigate } from "react-router"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { useAuthContext } from "./context/AuthContext"
import { useGetBalance } from "./hooks/useGetBalance"
import { useFetchSpents } from "./hooks/useFetchSpents"
import { Spent } from "./components/Spent/Spent"

function App() {
  const nav = useNavigate()
  const { username, user } = useAuthContext()
  const [userId, setUserId] = useState<string>("")
  const { spents } = useFetchSpents()

  useEffect(() => {
    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      nav("/register")
      return () => {}
    }

    onAuthStateChanged(auth, (user) => {
      const decodedToken = jwtDecode<User>(accessToken)

      if (user?.email !== decodedToken.email) {
        nav("/register")
      }
    })
  }, [nav])

  useEffect(() => {
    if (!user) {
      return () => {}
    }
    setUserId(user.uid)
  }, [user])

  const { money, bills } = useGetBalance(userId)

  return (
    <>
      <Sidebar />
      <div className="p-10">
        <h3 className="text-3xl font-semibold text-center">
          Bienvenido {username ? username : ""} 👋
        </h3>
        <p className="text-center text-gray-300">
          Aca podras ver los movimientos recientes
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-2 h-screen max-h-full w-96 sm:w-3/4 sm:max-w-[720px] bg-mirage-50 bg-opacity-20 items-center m-auto rounded-md sm:mx-12 mx-4 mb-4">
          <div className="flex flex-row gap-4 m-4 sm:gap-16">
            <div className="flex flex-col items-center w-42 min-w-44 font-semibold text-2xl bg-mirage-500 rounded-md pt-4 py-4">
              <h3>Dinero restante</h3>
              <h3 className="text-emerald-400">${money}</h3>
            </div>
            <div className="flex flex-col items-center w-42 min-w-44 font-semibold text-2xl bg-mirage-500 rounded-md pt-4 py-4">
              <h3>Gastos totales</h3>
              <h3 className="text-[#EC6565]">${bills}</h3>
            </div>
          </div>

          <div className={`flex justify-center flex-grow min-w-full`}>
            <div className="flex flex-col gap-2 min-h-full w-96 sm:min-w-full bg-mirage-50 bg-opacity-20 items-center m-auto rounded-md sm:mx-12 mx-4 mb-4 overflow-scroll  overflow-x-hidden">
              <div className="flex flex-row justify-around items-center w-full h-fit bg-gray-500 p-4 rounded-sm">
                <div>Fecha</div>
                <div>Tipo</div>
                <div>Nombre</div>
                <div>Precio</div>
              </div>
              {spents.map((spent, i) => (
                <Spent key={i} spent={spent}></Spent>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
