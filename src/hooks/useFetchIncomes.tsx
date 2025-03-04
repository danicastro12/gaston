import { doc, getDoc, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { firestore } from "../firebase/firebase"

export interface IncomesInterface {
  date: string
  amount: number
}

export interface FirestoreIncomes {
  date: Timestamp
  amount: number
}

export const useFetchIncomes = () => {
  const [incomes, setIncomes] = useState<IncomesInterface[]>([])
  const { user } = useAuthContext()
  useEffect(() => {
    if (!user) {
      return () => {}
    }
    const getData = async () => {
      const userRef = doc(firestore, "users", user?.uid)
      const docSnapshot = await getDoc(userRef)
      const data = docSnapshot.data()

      if (!data || !data.incomes) {
        return () => {}
      }

      data.incomes.forEach((doc: FirestoreIncomes) => {
        const date = doc.date.toDate()

        const dataObject = {
          amount: doc.amount,
          date: date.getDate() + "/" + (date.getMonth() + 1),
        }

        setIncomes((prevState): IncomesInterface[] => [
          ...prevState,
          dataObject,
        ])
      })
    }

    getData()
    return () => {
      setIncomes([])
    }
  }, [user])

  return { incomes }
}
