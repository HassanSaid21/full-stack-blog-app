import { useState } from "react";
import PostList from "../components/PostList"
import SideMenu from "../components/SideMenu";
import { useSearchParams } from "react-router-dom";

function PostsList() {
  
  const [open, setOpen] = useState(false);
  const [searchParams] =  useSearchParams()
  return (
    <div className="">
      <h1 className="mb-4 text-2xl">{searchParams.get('cat')} Blog</h1>
     <button className="bg-blue-800 rounded-xl p-2 md:hidden  text-white my-4" onClick={() => setOpen(open=>!open) } >{open ?'Close': 'Search or Filter' } </button>
     
      <div className="flex gap-8  flex-col-reverse  md:flex-row transition-all duration-1000">
        {/* posts */}
        <div className="">

        <PostList />
        </div>
        {/* side menu */}
        <div className={`${open ?'block':'hidden'} md:block`}><SideMenu /></div>
      </div>
    </div>
  )
}

export default PostsList
