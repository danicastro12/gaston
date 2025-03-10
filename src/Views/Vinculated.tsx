import { useEffect, useState } from "react"
import { useFetchVinculatedSpents } from "../hooks/useFetchVinculatedSpents"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useAuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { Spent } from "../components/Spent/Spent"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { useGetBalance } from "../hooks/useGetBalance"

export const Vinculated = () => {
  const [vinculatedId, setVinculatedId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  interface FormValues {
    id: string
  }

  const { register, handleSubmit } = useForm<FormValues>()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) {
      return () => {}
    }
    const getData = async () => {
      const docRef = doc(firestore, "users", user.uid)
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      if (!docData || !docData.authorized) {
        setVinculatedId("")
        return
      }
      setVinculatedId(docData.authorized)
    }

    getData()
  }, [user])

  const { spents } = useFetchVinculatedSpents(vinculatedId)
  const { money } = useGetBalance(vinculatedId)

  const onSubmit = async (data: { id: string }) => {
    if (!user) {
      return
    }
    const authorizeRef = doc(firestore, "users", user.uid)
    await updateDoc(authorizeRef, {
      authorize: data.id,
    })
    const authorizedRef = doc(firestore, "users", data.id)
    await updateDoc(authorizedRef, {
      authorized: user.uid,
    })

    setIsOpen(true)
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  return (
    <>
      <Sidebar />
      <div className="pt-16">
        <form
          className="flex flex-row justify-center gap-8 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="text-black rounded-md p-2"
            placeholder="Codigo de usuario"
            {...register("id")}
          ></input>
          <button className="bg-emerald-700 rounded-md px-4 py-2">
            Vincular
          </button>
        </form>
        {vinculatedId ? (
          <div className="flex items-center flex-col">
            <div className="flex flex-col items-center font-semibold text-2xl rounded-md pt-4 py-4">
              <h3>Dinero restante</h3>
              <h3 className="text-emerald-400">${money}</h3>
            </div>
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
            </div>
          </div>
        ) : (
          <h3 className="text-center m-2 text-3xl font-bold">
            No tienes cuentas vinculadas
          </h3>
        )}
        {isOpen ? (
          <div className=" absolute bottom-0 p-4 m-2 bg-emerald-600 bg-opacity-60 w-fit rounded-md">
            <h3>Autorizado con exito</h3>
          </div>
        ) : null}
      </div>
    </>
  )
}
