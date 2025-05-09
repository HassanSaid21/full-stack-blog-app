import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function MainLayout() {
  return (
    <div className='px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
          {/* Navbar */}
          <Navbar />
          {/* child Component */}
          <Outlet />
        
        
          </div>
  )
}

export default MainLayout
