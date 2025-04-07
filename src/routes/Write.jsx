import { SignIn, useUser } from "@clerk/clerk-react";
import ReactQuill from 'react-quill-new';
function Write() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <div>Loading...</div>;

  if (isLoaded && !isSignedIn)
    return (
      <div className="flex flex-col  items-center gap-4 mt-8">
        <h1 className="font-medium text-2xl">Please sign In</h1>
        <SignIn />
      </div>
    );

  return <div className="h-[calc(100%]vh -v64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
    <h1 className="font-light text-xl">Create a new post </h1>
    <form action="" className="flex flex-col gap-6 flex-1 mb-6">
      <button className="rounded-xl bg-white w-max p-2 text-gray-500 text-sm shadow-md">Add a cover Image </button>
      <input type="text" placeholder="My Awesome Story"  className="bg-transparent text-3xl font-semibold outline-none"/>
      <div className="gap-2 flex items-center ">
      <label htmlFor='categories' className="text-sm ">Choose a category :</label>
      <select name="categories" id="cat" className="p-2 shadow-md bg-white rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="general">general</option>
        <option value="databases">Databases</option>
        <option value="web-design">Web Design</option>
        <option value="seo">Search engine</option>
        <option value="development">Development</option>
        <option value="marketing">Marketing</option>
        
      </select></div>
      <textarea className="p-4 shadow-md rounded-xl bg-white " name="desc" placeholder="A Short Description "></textarea>
      <ReactQuill theme ='snow' className="flex-1 rounded-xl bg-white shadow-md"/>
      <button className="rounded-xl bg-blue-800 text-white p-2  mt-4 w-36 shadow-md font-medium">send</button>
    </form>
  </div>;
}

export default Write;
