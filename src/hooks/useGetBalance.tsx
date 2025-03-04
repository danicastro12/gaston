import { useEffect, useState } from "react"
import { firestore } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import { FirestoreInterface } from "./useFetchSpents"

export const useGetBalance = (uid: string) => {
  const [money, setMoney] = useState<number>(0)
  const [bills, setBills] = useState<number>(0)

  useEffect(() => {
    if (!uid) {
      return () => {}
    }

    const getBalance = async () => {
      const userDocRef = doc(firestore, "users", uid)
      const userDoc = await getDoc(userDocRef)
      const userDocData = userDoc.data()

      if (!userDocData || !userDocData.money) {
        return () => {}
      }

      setMoney(userDocData.money)

      userDocData.spents.forEach((spent: FirestoreInterface) => {
        const bill = parseInt(spent.price)
        setBills((prevState) => prevState + bill)
        setMoney((prevState) => prevState - bill)
      })
    }

    getBalance()

    return () => {
      setMoney(0)
      setBills(0)
    }
  }, [uid])
  return { money, bills }
}
