import { useEffect, useState } from "react"
import "./App.css"
import { Spent } from "./components/Spent/Spent"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { jwtDecode } from "jwt-decode"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "./firebase/firebase"
import { useNavigate } from "react-router"
import { useFetchSpents } from "./hooks/useFetchSpents"
import { AddSpent } from "./components/Spent/AddSpent"
import { createPortal } from "react-dom"
import { Modal } from "./components/Modal/Modal"

function App() {
  const nav = useNavigate()
  const { spents } = useFetchSpents()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const modal = document.getElementById("modal")
  if (!modal) {
    return null
  }

  return (
    <>
      <Sidebar />
      <div className="p-10">
        <h3 className="text-3xl font-semibold text-center">Bienvenido 👋</h3>
        <p className="text-center text-gray-300">
          Aca podras ver los movimientos recientes
        </p>
      </div>
      <div className={`flex justify-center ${isOpen ? "" : ""}`}>
        <div className="flex flex-col gap-2 h-screen max-h-full w-96 sm:w-1/2 bg-mirage-50 bg-opacity-20 items-center m-auto rounded-md sm:mx-12 mx-4 mb-4 overflow-scroll  overflow-x-hidden">
          <div className="flex flex-row justify-around items-center w-full h-fit bg-gray-500 p-4 rounded-sm">
            <div>Fecha</div>
            <div>Tipo</div>
            <div>Nombre</div>
            <div>Precio</div>
          </div>
          {spents.map((spent, i) => (
            <Spent key={i} spent={spent}></Spent>
          ))}
          <AddSpent onClick={handleClick}>+ Agregar Gasto</AddSpent>
        </div>
      </div>
      {isOpen &&
        createPortal(
          <Modal
            handleClose={() => {
              setIsOpen(false)
            }}
          ></Modal>,
          modal
        )}
    </>
  )
}

export default App
