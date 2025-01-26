import { useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()
  if(location.pathname === "/login")return null
  return (
    <div className=" h-24 shadow-customLight w-full font-macondo text-5xl font-extrabold flex justify-center items-center">
Archive
    </div>
  )
}

export default Navbar