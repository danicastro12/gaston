import React from "react"

interface Props {
  children: React.ReactNode
  onClick(): void
}

export const AddSpent = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-center items-center w-full h-fit bg-emerald-700 p-4 rounded-sm"
    >
      {children}
    </button>
  )
}
