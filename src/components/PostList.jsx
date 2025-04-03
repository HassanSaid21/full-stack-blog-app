import PostListItem from "./PostListItem"

function PostList() {
  return (<>
  <h1 className="text-gray-400 text-2xl">Recent Posts</h1>
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
