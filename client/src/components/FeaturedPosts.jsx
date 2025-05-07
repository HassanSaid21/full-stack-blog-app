import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {format} from 'timeago.js'
const url = import.meta.env.VITE_API_URL
async function fetchFeaturedPosts() {


  const res =  await axios.get(`${url}/posts`,{
    params: {
      featured: true ,
      limit:4,
      sort:'newest'
    }
  }
  )
  return res.data
  
}
function FeaturedPosts() {

  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchFeaturedPosts(),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.response.data}</p>;
  const firstPost = data.posts[0]
  const restPosts = data.posts.slice(1)
 console.log(restPosts)
  return (
    <div className="flex my-8 flex-col lg:flex-row gap-8 ">
      {/* first */}

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        <Image
          src={firstPost.img}
          className="rounded-3xl object-cover"
          w={960}
        />
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg ">01.</h1>
          <Link className="text-blue-800 lg:text-lg ">{firstPost.category}</Link>
          <span className="text-gray-500">{format(firstPost.createdAt)}</span>
        </div>
        {/* title */}
        <Link
          to={`/${firstPost.slug}`}
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
        </Link>
      </div>

      {/* others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 ">
        {/* second */}
      { restPosts.map( (post)=>(
           <div key={post.slug} className=" lg:h-1/3 flex justify-between gap-4 ">
          {/* image */}
          <div className="w-1/3 aspect-video">
            <Image
              src={post.img}
              className="rounded-3xl  object-cover w-full h-full "
              w={320}
            />
          </div>
          {/* details and title */}
          <div className=" w-2/3 flex flex-col ">
            {/* details */}
            <div className="flex gap-4 items-center mb-4 text-sm lg:text-base">
              <h1 className="font-semibold ">02.</h1>
              <Link className="text-blue-800 ">{post.category}</Link>
              <span className="text-gray-400 text-sm">{format(post.createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={`/${post.slug}`}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Link>
          </div>
        </div>)
      )
      }
        
      </div>
    </div>
  );
}

export default FeaturedPosts;
