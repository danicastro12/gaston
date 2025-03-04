import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useFetchSpents } from "../hooks/useFetchSpents"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { AddSpent } from "../components/Spent/AddSpent"
import { Spent } from "../components/Spent/Spent"
import { Modal } from "../components/Modal/Modal"
import { useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode"
import { User } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"

export const Spents = () => {
  const { spents } = useFetchSpents()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const nav = useNavigate()

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
      <div className={`flex justify-center pt-16${isOpen ? "" : ""}`}>
        <div className="flex flex-col gap-2 h-screen max-h-full w-96 sm:w-3/4 sm:max-w-[720px] bg-mirage-50 bg-opacity-20 items-center m-auto rounded-md sm:mx-12 mx-4 mb-4 overflow-scroll overflow-x-hidden">
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
