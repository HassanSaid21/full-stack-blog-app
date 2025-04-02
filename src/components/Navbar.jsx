import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen((open) => !open);
  }
  return (
    <div className="flex w-full h-16 md:h-20  items-center justify-between">
      {/* Logo */}
      <div className="flex gap-4 text-2xl font-bold">
        <img src="/logo.png" alt="the blog-logo" className="w-8 h-8" />
        <span>Protoblog</span>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/*Mobile button  */}
        <button onClick={handleOpen} className=" text-3xl text-gray-800">
          {open ? "X" : "☰"}
        </button>
        <div
          className={`h-screen w-full ${
            open ? "-right-0" : "-right-[100%]"
          } flex flex-col items-center justify-center absolute top-16 transition-all text-lg ease-in-out gap-8`}
        >
          <a href="">Home</a>
          <a href="">Trending</a>
          <a href="">Most Popular</a>
          <a href="">About</a>
          <a href="">
            <button className="py-2 px-4 bg-blue-900 rounded-2xl text-white">
              👋 login
            </button>
          </a>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8  xl:gap-12 font-medium ">
        <a href="">Home</a>
        <a href="">Trending</a>
        <a href="">Most Popular</a>
        <a href="">About</a>
        <a href="">
          <button className="py-2 px-4 bg-blue-900 rounded-2xl text-white">
            👋 login
          </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
