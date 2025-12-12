import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen((open) => !open);
  }
  return (
    <div className="flex w-full h-16 md:h-20  items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="the blog-logo" w={32} h={32} />
        <span>Protoblog</span>
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/*Mobile button  */}
        <button onClick={handleOpen} className=" text-3xl text-gray-800 ">
          {open ? "X" : "☰"}
        </button>
        <div
          className={`h-screen w-full ${
            open ? "-right-0" : "-right-[100%]"
          } bg-[#e6e6ff] flex flex-col items-center justify-center absolute top-16 transition-all text-lg ease-in-out gap-8`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 bg-blue-900 rounded-2xl text-white">
              👋 login
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8  xl:gap-12 font-medium ">
        <Link to="/">Home</Link>
        <Link to="/posts">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 bg-blue-900 rounded-2xl text-white">
              👋 login
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;
