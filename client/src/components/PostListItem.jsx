import { Link } from "react-router-dom";
import Image from "./Image";
import {format} from 'timeago.js'
function PostListItem({post}) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      <div className="md:hidden xl:block">
      {post.img&&  <Image
          src={post.img}
          className="rounded-2xl object-cover"
          w={753}
        />}
      </div>
      {/* details */}
      <div className="flex flex-col gap-4">
        <Link to={`/${post.slug}`} className="font-semibold text-4xl">
          {post.title}
        </Link>
        <div className="flex gap-2 items-center text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={`posts/?author=${post.user.username}`} className="text-blue-800">{post?.user?.username}</Link>
          <span>on</span>
          <Link to={`posts/?cat=${post.category}`} className="text-blue-800">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        {post.desc && (
          <p className="text-gray-600">
            {post.desc}
          </p>
        )}
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default PostListItem;
