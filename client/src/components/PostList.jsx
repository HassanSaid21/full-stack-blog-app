
import { useQuery } from "@tanstack/react-query"
import PostListItem from "./PostListItem"
import axios from 'axios'
function PostList() {

     async function fetchPosts() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      return res.data
     }
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn:()=> fetchPosts() ,
  }) 
  
  return (<>

    <div className="flex flex-col gap-12 mb-8 ">
      
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      </div></>
  )
}

export default PostList
