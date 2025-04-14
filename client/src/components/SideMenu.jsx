import { Link } from "react-router-dom";
import Search from "./Search";

function SideMenu() {
  return (
    <div className="sticky h-max top-8">
      <h1 className="mt-8 mb-4 font-medium text-sm">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 font-medium text-sm">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center  gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newest"
            className=" appearance-none bg-white border-blue-800  border-[1.5px] w-4 h-4 checked:bg-blue-800 cursor-pointer rounded-sm"
          />
          Newest
        </label>
        <label htmlFor="" className="flex gap-2 items-center text-sm">
          <input
            type="radio"
            name="sort"
            value="Most Popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-500 cursor-pointer checked:bg-blue-800  bg-white rounded-sm"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex gap-2 items-center text-sm">
          <input
            type="radio"
            name="sort"
            value="Trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-500 cursor-pointer checked:bg-blue-800  bg-white rounded-sm"
          />
          Trending
        </label>
        <label htmlFor="" className="flex gap-2 items-center text-sm">
          <input
            type="radio"
            name="sort"
            value="Oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-500 cursor-pointer checked:bg-blue-800  bg-white rounded-sm"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 font-medium text-sm">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Link className="underline cursor-pointer">All</Link>
        <Link className="underline cursor-pointer">Web Design</Link>
        <Link className="underline cursor-pointer">Development</Link>
        <Link className="underline cursor-pointer">Databases</Link>
        <Link className="underline cursor-pointer">Search Engines</Link>
        <Link className="underline cursor-pointer">Marketing</Link>
      </div>
    </div>
  );
}

export default SideMenu;
