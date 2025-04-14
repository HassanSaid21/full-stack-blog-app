import { SignIn, useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Write() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess :(res)=>{ 
      toast.success('post has been created successfully')
      navigate(`/${res.data.slug}`)
  },
  onError:(err)=> toast.error(err?.response?.data?.message || "Something went wrong")

  });
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      content: value,
      title: formData.get("title"),
      desc: formData.get("desc"),
      category: formData.get("category"),
    };
    
    mutation.mutate(data);
  }

  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <div>Loading...</div>;

  if (isLoaded && !isSignedIn)
    return (
      <div className="flex flex-col  items-center gap-4 mt-8">
        <h1 className="font-medium text-2xl">Please sign In</h1>
        <SignIn />
      </div>
    );

  return (
    <div className="h-[calc(100vh -v64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl text-blue-900 font-semibold">
        <i>Create a new post</i>{" "}
      </h1>
      <form
        action=""
        className="flex flex-col gap-6 flex-1 mb-6"
        onSubmit={handleSubmit}
      >
        <button className="rounded-xl bg-white w-max p-2 text-gray-500 text-sm shadow-md">
          Add a cover Image{" "}
        </button>
        <input
          type="text"
          placeholder="My Awesome Story"
          className="bg-transparent text-3xl font-semibold outline-none"
          name="title"
        />
        <div className="gap-2 flex items-center ">
          <label htmlFor="categories" className="text-sm ">
            Choose a category :
          </label>
          <select
            name="category"
            id="cat"
            className="p-2 shadow-md bg-white rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">general</option>
            <option value="databases">Databases</option>
            <option value="web-design">Web Design</option>
            <option value="seo">Search engine</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 shadow-md rounded-xl outline-none bg-white "
          name="desc"
          placeholder="A Short Description "
        ></textarea>
        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={value}
          onChange={setValue}
        />
        <button
          disabled={mutation.isPending}
          className="rounded-xl bg-blue-800 text-white p-2   w-36 shadow-md font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "loading..." : "send"}
        </button>
        {mutation.isError && <span>{mutation.error.message} </span>}
      </form>
    </div>
  );
}

export default Write;
