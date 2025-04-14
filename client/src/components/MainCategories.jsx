import { Link } from "react-router-dom"


function MainCategories() {
  return (
    <div className="hidden md:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8">
    {/* links */}
    <div className="flex-1 flex gap-1 flex-wrap items-center justify-between">
      <Link to='/posts' className=" bg-blue-800  text-white rounded-full px-4 py-2">All Posts</Link>
      <Link to='posts?cat=web-design ' className=' hover:bg-blue-50 rounded-full px-4 py-2'>Web Design</Link>
      <Link to='posts?cat=development ' className=' hover:bg-blue-50 rounded-full px-4 py-2'>Development</Link>
      <Link to='posts?cat=database ' className=' hover:bg-blue-50 rounded-full px-4 py-2'>Database</Link>
      <Link to='posts?cat=seo' className=' hover:bg-blue-50 rounded-full px-4 py-2'>Search Engines</Link>
      <Link to='posts?cat=marketing' className=' hover:bg-blue-50 rounded-full px-4 py-2'>Marketing</Link>
    
    </div>
    <span className="font-medium text-xl ">|</span>
    <div className="bg-gray-100 flex items-center gap-2 p-2 rounded-full ">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="gray"
  >
    <circle cx="10.5" cy="10.5" r="7.5" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
      <input type="text" placeholder="search post ..." className="bg-transparent  outline-none " />

    </div>
    {/* search */}
  </div>
  )
}

export default MainCategories
