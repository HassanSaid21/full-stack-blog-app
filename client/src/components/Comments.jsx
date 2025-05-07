import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";


const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

function Comments({ postId }) {
  const { getToken } = useAuth();
  const {user} = useUser()
  const { data, isPending, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });
  const queryClient  = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      // toast.success("comment has been created successfully");
      queryClient.invalidateQueries({queryKey: ["comments", postId]})
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Something went wrong"),
  });

  function handleSubmit  (e){
    e.preventDefault()
    const formData = new FormData (e.target)
    const data ={
      desc: formData.get('desc')
    }
    mutation.mutate(data)
  }



 



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8  lg:w-4/5">
      <h1 className="font-medium    text-xl text-gray-500 underline">
        Comments
      </h1>

      <div className="flex gap-8 mb-4 items-center justify-between w-full">
        <textarea
          type="text"
          placeholder="Write a comment..."
          className="outline-none rounded-xl flex-1 p-4"
          name="desc"
        />
        <button className="bg-blue-800 rounded-xl text-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={mutation.isPending===true}>
          Send
        </button>
      </div> 
      {isPending? 'loading...' : error?`Error: ${error.message}`:(
        <>
        {
          mutation.isPending&&
          <Comment  comment={{createdAt: new Date() ,
            user :{
            img : user.imageUrl,
            username : user.username
            } ,
            desc :`${mutation.variables.desc} (sending .....)`  ,
          }} /> 
        }
        {data.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}</>)}
    </form>
  );
}

export default Comments;
