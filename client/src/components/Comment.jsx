import { useAuth, useUser } from "@clerk/clerk-react";
import Image from "./Image";
import { format } from "timeago.js";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function Comment({ comment  , postId }) {
  const { user } = useUser();
  console.log(user?.publicMetadata?.role)
  const { getToken } = useAuth();
  const queryClient = useQueryClient()
  
  const Mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
    queryClient.invalidateQueries({queryKey :["comments", postId]})
      toast.success(`${res.data}`);
    
    },
    onError: (err) => {
      toast.error(`Error: ${err.response.data}`);
    },
  });

  function handleDelete() {
    Mutation.mutate();
  }

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  return (
    <div className="rounded-xl bg-slate-50 gap-4  p-8  flex flex-col w-full">
      <div className="flex flex-row items-end">
        <div className="flex gap-4 items-center flex-grow ">
          {comment.user.img && (
            <Image
              src={comment.user.img}
              className="w-8 h-8 rounded-full object-cover"
              w={40}
            />
          )}

          <span className="font-medium ">{comment.user.username}</span>
          <span className="text-sm text-gray-500">
            {format(comment.createdAt)}
          </span>
        </div>
        {user && (user.username === comment.user.username || isAdmin) && (
          <span
            className="bg-red-800 cursor-pointer text-white rounded-xl px-2 py-1 self-end"
            onClick={handleDelete} 
            
          >
            Delete
          </span>
        )}
      </div>
      <p> {comment.desc}</p>
    </div>
  );
}

export default Comment;
