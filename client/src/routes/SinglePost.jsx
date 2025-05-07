import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import ArticleRenderer from "../components/ArticleRenderer";
import DOMPurify from "dompurify";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

function SinglePost() {
  const { slug } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.response.data}</p>;
  // console.log(data.content);
   console.log(data);

  return (
    <div className="flex flex-col  gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="flex gap-8 flex-col lg:w-3/5 ">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image
              src={data.img}
              className="rounded-2xl object-fit w-full h-full"
              w={600}
            />
          </div>
        )}
      </div>

      {/* content */}
      <div className="flex flex-col-reverse md:flex-row  items-baseline gap-8 w-full">
        {/* text */}
        {/* <div dangerouslySetInnerHTML={{ __html: cleanContent }}/> */}
        <div className="flex flex-col gap-6 lg:text-lg text-justify   flex-grow ">
          <ArticleRenderer content={DOMPurify.sanitize(data.content)} />

          <Comments postId={data._id} />
        </div>
        {/* aside menu */}
        <div className="flex flex-col px-4 md:sticky top-8   h-max">
          <h1 className=" mb-4 text-sm font-medium ">Author</h1>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-6 items-center">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w={48}
                  h={48}
                />
              )}

              <Link className="text-blue-800"> {data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor amet consectetur
            </p>
            <div className="flex gap-2 items-center">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />

          <h1 className="mt-8 mb-4 text-sm font-medium ">Categories</h1>
          <div className="flex flex-col gap-2 text-sm" role="navigation">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>

          <h1 className="mt-8 mb-4 text-sm font-medium ">search</h1>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
