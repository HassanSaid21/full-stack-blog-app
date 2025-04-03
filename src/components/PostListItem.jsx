import { Link } from "react-router-dom";
import Image from "./Image";

function PostListItem() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="md:hidden xl:block">
        <Image src="postImg.jpeg" className="rounded-2xl object-cover" w={753} />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4">
        <Link to="test" className="font-semibold text-4xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elitullam
          skalasoksk ddkskdsdm.
        </Link>
        <div className="flex gap-2 items-center  text-gray-400 text-sm">
          <span> Written by</span>
          <Link className="text-blue-800">John doe</Link>
          <span>on</span>
          <Link className="text-blue-800">We Design</Link>
          <span>2 days ago</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
          eligendi sit sunt earum maxime deserunt, doloribus consequatur
          expedita, dolorem ex .
        </p>
        <Link to='/test' className="underline text-blue-800 text-sm">Read more</Link>
      </div>
    </div>
  );
}

export default PostListItem;
