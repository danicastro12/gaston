import { SpentInterface } from "../../models/spents/spents.model"

export const Spent = ({ spent }: { spent: SpentInterface }) => {
  return (
    <div className="flex flex-row justify-around items-center w-full h-fit bg-gray-300 bg-opacity-20 p-4 rounded-sm">
      <div>{spent.date}</div>
      <div>{spent.type}</div>
      <div>{spent.name}</div>
      <div>{spent.price}</div>
    </div>
  )
}
