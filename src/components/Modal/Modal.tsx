import { useForm } from "react-hook-form"
import { Timestamp, updateDoc, arrayUnion, doc } from "firebase/firestore"
import { firestore } from "../../firebase/firebase"
import { FirestoreInterface } from "../../hooks/useFetchSpents"
import { useAuthContext } from "../../context/AuthContext"

interface FormData {
  name: string
  type: string
  price: string
}

export const Modal = ({ handleClose }: { handleClose: () => void }) => {
  const { register, handleSubmit } = useForm<FormData>()
  const { user } = useAuthContext()

  const addSpent = async (spentObject: FirestoreInterface) => {
    if (!user) {
      return
    }
    const userRef = doc(firestore, "users", user.uid)
    await updateDoc(userRef, {
      spents: arrayUnion(spentObject),
    })
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
    const date = new Date()
    const timeStamp = Timestamp.fromDate(date)
    const spentObject = {
      name: data.name,
      type: data.type,
      price: data.price,
      date: timeStamp,
    }
    addSpent(spentObject)
    handleClose()
  }

  return (
    <div
      onClick={handleClose}
      className="flex justify-center items-center fixed h-screen w-screen backdrop-blur-md"
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="flex flex-col w-72 h-72 bg-mirage-500 z-10 justify-center rounded-md"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 text-black"
        >
          <input
            {...register("type")}
            className="p-1"
            placeholder="Tipo"
          ></input>
          <input
            {...register("name")}
            className="p-1"
            placeholder="Nombre"
          ></input>
          <input
            {...register("price")}
            className="p-1"
            placeholder="Precio"
          ></input>
          <button className="p-2 rounded-md bg-emerald-600">Agregar</button>
        </form>
      </div>
    </div>
  )
}
