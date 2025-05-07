import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "./Search";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Most Popular", value: "popular" },
  { label: "Trending", value: "trending" },
  { label: "Oldest", value: "oldest" },
];

const categories = [
  { label: "All", value: "" },
  { label: "Web Design", value: "web-design" },
  { label: "Development", value: "development" },
  { label: "Databases", value: "databases" },
  { label: "Search Engines", value: "seo" },
  { label: "Marketing", value: "marketing" },
];

function SideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const cat = searchParams.get("cat");

  useEffect(() => {
    // When category changes, clear the sort selection
    setSort("");
    searchParams.delete("sort");
    setSearchParams(searchParams);
  }, [cat]);

  function handleSortChange(e) {
    if (searchParams.get('sort') !== e.target.value)
      {
    const newSort = e.target.value;
    setSort(newSort);
    setSearchParams({...Object.fromEntries(searchParams),sort:newSort});}
  }

  return (
    <div className="sticky h-max top-8">
      <h1 className="mt-8 mb-4 font-medium text-sm">Search</h1>
      <Search />

      <h1 className="mt-8 mb-4 font-medium text-sm">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        {sortOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value={option.value}
              checked={sort === option.value}
              onChange={handleSortChange}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-500 rounded-sm bg-white checked:bg-blue-800 cursor-pointer"
            />
            {option.label}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 font-medium text-sm">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        {categories.map(({ label, value }) => (
          <Link
            key={label}
            to={value ? `/posts?cat=${value}` : "/posts"}
            className="underline cursor-pointer"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
