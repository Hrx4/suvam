import { useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  if(location.pathname === "/login")return null
  return (
    <div className=" h-24 shadow-customLight w-full text-2xl font-extrabold flex justify-center items-center">
Suvam The story teller 
    </div>
  )
}

export default Navbar