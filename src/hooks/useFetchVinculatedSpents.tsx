import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { SpentInterface } from "../models/spents/spents.model"
import { FirestoreInterface } from "./useFetchSpents"
import { firestore } from "../firebase/firebase"

export const useFetchVinculatedSpents = (uid: string) => {
  const [spents, setSpents] = useState<SpentInterface[]>([])

  console.log(uid)
  useEffect(() => {
    if (!uid) {
      return () => {}
    }
    const getData = async () => {
      const userRef = doc(firestore, "users", uid)
      const docSnapshot = await getDoc(userRef)
      const data = docSnapshot.data()

      console.log(data)

      if (!data) {
        return () => {}
      }

      console.log(data.spents)

      data.spents.forEach((doc: FirestoreInterface) => {
        const date = doc.date.toDate()

        const dataObject = {
          name: doc.name,
          price: doc.price,
          type: doc.type,
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
  }, [uid])

  return { spents }
}
