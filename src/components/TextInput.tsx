import React from "react";

interface props {
  children: string;
}

export const TextInput: React.FC<props> = ({ children }) => {
  return (
    <input
      type="text"
      className="w-56 h-10 outline-none px-2 bg-transparent border-mirage-50 border-b-2 mb-4"
      placeholder={children}
    />
  );
};
