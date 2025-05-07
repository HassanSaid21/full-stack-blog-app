import { useInfiniteQuery } from "@tanstack/react-query";
import PostListItem from "./PostListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

async function fetchPosts(pageParam , searchParams) {
  const searchParamsObj =  Object.fromEntries([...searchParams])
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10  , ...searchParamsObj},
  });
  return res.data;
}

function PostList() {

  const [searchParams ] = useSearchParams()

  // for infinite scrolling
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam , searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
    // console.log(data)

  if (status === "pending")
    return <p style={{ color: "blue" }}>Loading ....</p>;
  if (status === "error")
    return <p style={{ color: "red" }}>{`Error : ${error.message}`}</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  return (
    <>
      <InfiniteScroll
        dataLength={allPosts.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading mores posts...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>all posts loaded</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {allPosts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default PostList;
