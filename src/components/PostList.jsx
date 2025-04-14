import { useQuery } from "@tanstack/react-query"
import PostListItem from "./PostListItem"

function PostList() {

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
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
