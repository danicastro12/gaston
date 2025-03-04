import { IncomesInterface } from "../../hooks/useFetchIncomes"

export const Income = ({ income }: { income: IncomesInterface }) => {
  return (
    <div className="flex flex-row justify-around items-center w-full h-fit bg-gray-300 bg-opacity-20 p-4 rounded-sm">
      <div>{income.date}</div>
      <div>${income.amount}</div>
    </div>
  )
}
