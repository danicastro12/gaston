import { useEffect, useState } from "react"
import { collection, getDocs, Timestamp } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { SpentInterface } from "../models/spents/spents.model"

export interface FirestoreInterface {
  name: string
  type: string
  price: string
  date: Timestamp
}

export const useFetchSpents = () => {
  const [spents, setSpents] = useState<SpentInterface[]>([])

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "gastos"))

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FirestoreInterface
        const date = data.date.toDate()

        const dataObject = {
          name: data.name,
          price: data.price,
          type: data.type,
          date: date.getDate() + "/" + (date.getMonth() + 1),
        }

        console.log(dataObject)
        setSpents((prevState): SpentInterface[] => [...prevState, dataObject])
      })
    }

    getData()
    return () => {
      setSpents([])
    }
  }, [])

  return { spents }
}
