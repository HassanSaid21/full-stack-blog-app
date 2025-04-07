import Image from "./Image"


function Comment() {
  return (
    <div className="rounded-xl bg-slate-50 gap-4  p-8  flex flex-col w-full">
      <div className="flex gap-4 items-center ">
        
          <Image src='userImg.jpeg' className='w-8 h-8 rounded-full object-cover' w={40} />
        
        <span className="font-medium ">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <p>      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam,.</p>
    </div>
  )
}

export default Comment
