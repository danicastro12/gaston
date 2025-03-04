import { useState } from "react"
import { Link } from "react-router"

export const Sidebar = () => {
  const [isHidden, setIsHidden] = useState(true)

  const handleClick = () => {
    setIsHidden(!isHidden)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="p-6 hover:cursor-pointer w-fit absolute top-0 z-20"
      >
        <i className="fa-solid fa-bars fa-lg"></i>
      </div>

      <nav
        className={`${
          isHidden ? "-mx-80" : ""
        } flex flex-col h-screen max-h-full w-1/6 min-w-72 bg-mirage-800 gap-4 px-4 py-20 rounded-r-xl transition-all z-10 fixed`}
      >
        <Link to="/">
          <div className="flex items-baseline p-6 hover:cursor-pointer hover:bg-mirage-600 rounded-md transition-all">
            <i className="fa-solid fa-house fa-lg pr-4"></i>
            <span>Inicio</span>
          </div>
        </Link>

        <div className="flex items-baseline p-6 hover:cursor-pointer hover:bg-mirage-600 rounded-md transition-all">
          <Link to={"/bills"}>
            <i className="fa-solid fa-receipt fa-lg pr-4"></i>
            <span>Mis gastos</span>
          </Link>
        </div>

        <div className="flex items-baseline p-6  hover:cursor-pointer hover:bg-mirage-600 rounded-md transition-all">
          <Link to={"/income"}>
            <i className="fa-solid fa-wallet fa-lg pr-4"></i>
            <span>Ingresos</span>
          </Link>
        </div>

        <div className="flex items-baseline justify-self-end p-6  hover:cursor-pointer hover:bg-mirage-600 rounded-md transition-all">
          <i className="fa-solid fa-gear fa-lg pr-4"></i>
          <span>Configuración</span>
        </div>

        <div className="flex items-baseline justify-self-end p-6  hover:cursor-pointer hover:bg-mirage-600 rounded-md transition-all">
          <Link className="w-fit h-fit" to={"/vinculated"}>
            <i className="fa-solid fa-users fa-lg pr-4"></i>
            <span>Cuentas vinculadas</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
