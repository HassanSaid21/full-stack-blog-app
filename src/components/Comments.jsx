import Comment from "./Comment"

function Comments() {
  return (
    <div className="flex flex-col gap-8 mt-8  lg:w-4/5">
      <h1 className="font-medium    text-xl text-gray-500 underline">Comments</h1>

      <div className="flex gap-8 mb-4 items-center justify-between w-full">
        <textarea type='text' placeholder="Write a comment..." className="outline-none rounded-xl flex-1 p-4"/>
        <button className="bg-blue-800 rounded-xl text-white px-4 py-2">Send</button>
      </div>
      <Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/><Comment/>
       
    </div>
  )
}

export default Comments
