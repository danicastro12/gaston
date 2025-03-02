import { useEffect, useState } from "react"
import { doc, Timestamp, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { SpentInterface } from "../models/spents/spents.model"
import { useAuthContext } from "../context/AuthContext"

export interface FirestoreInterface {
  name: string
  type: string
  price: string
  date: Timestamp
}

export const useFetchSpents = () => {
  const [spents, setSpents] = useState<SpentInterface[]>([])
  const { user } = useAuthContext()
  useEffect(() => {
    if (!user) {
      return () => {}
    }
    const getData = async () => {
      const userRef = doc(firestore, "users", user?.uid)
      const docSnapshot = await getDoc(userRef)
      const data = docSnapshot.data()

      if (!data) {
        return () => {}
      }

      data.spents.forEach((doc: FirestoreInterface) => {
        const date = doc.date.toDate()

        const dataObject = {
          name: doc.name,
          price: doc.price,
          type: doc.type,
          date: date.getDate() + "/" + (date.getMonth() + 1),
        }

        setSpents((prevState): SpentInterface[] => [...prevState, dataObject])
      })
    }

    getData()
    return () => {
      setSpents([])
    }
  }, [user])

  return { spents }
}
