import { useForm } from "react-hook-form"
import { Income } from "../components/Income/Income"
import { Sidebar } from "../components/Sidebar/Sidebar"
import { useFetchIncomes } from "../hooks/useFetchIncomes"
import { firestore } from "../firebase/firebase"
import { useAuthContext } from "../context/AuthContext"
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"

export const Incomes = () => {
  interface FieldValues {
    amount: string
  }

  const { incomes } = useFetchIncomes()
  const { user } = useAuthContext()
  const { register, handleSubmit, reset } = useForm<FieldValues>()

  const onSubmit = async (data: FieldValues) => {
    if (!user) {
      return
    }
    const docRef = doc(firestore, "users", user.uid)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()
    if (!docData) {
      return
    }

    const accountMoney = docData.money
    const date = new Date()
    const timeStamp = Timestamp.fromDate(date)
    await updateDoc(docRef, {
      incomes: arrayUnion({ date: timeStamp, amount: data.amount }),
    })
    await updateDoc(docRef, {
      money: accountMoney + parseInt(data.amount),
    })

    reset()
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="flex items-center flex-col pt-16 min-w-full h-screen max-h-full">
        <div className="flex items-center flex-col">
          <h3 className="text-center font-semibold text-3xl">Ingresos</h3>
          <p className="text-[#ccc] pt-2">¿Te ingresó dinero?</p>
          <p className="text-[#ccc]">
            Registralo acá así no perdés el seguimiento
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="number"
              {...register("amount")}
              className="p-1 my-2 rounded-sm text-black"
              placeholder="Cantidad de dinero"
            ></input>
            <button className="bg-emerald-700 rounded-sm p-1 mx-2">
              Ingresar
            </button>
          </form>
        </div>

        <div className="flex flex-col w-96 sm:w-3/4 bg-mirage-700 min-h-full mx-4 gap-1 my-2 rounded-md sm:max-w-[720px]">
          <div className="flex flex-row justify-around items-center w-full h-fit bg-gray-500 p-4 rounded-sm">
            <div>Fecha</div>
            <div>Cantidad</div>
          </div>
          {incomes.map((income, i) => (
            <Income key={i} income={income}></Income>
          ))}
        </div>
      </div>
    </>
  )
}
