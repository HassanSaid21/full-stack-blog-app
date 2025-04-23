import { IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { toast } from "react-toastify";





function Upload({file  , type , children  ,setData ,setProgress}) {
   const ref = useRef(null)
  const onError = err => {
    toast.error(`${type} Upload Failed`)
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    toast.success('image has been uploaded successfully', {position:'top-right'})
    // console.log("Success", res);
      setData(res)
  };
  const  onUploadProgress = progress =>{
    console.log(progress)
    setProgress(Math.round((progress.loaded / progress.total*100)))
  }


  return (
    <>
    <IKUpload
          fileName={file}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
          ref={ref}
          accept={`${type}/*`}
          />
          <div className="cursor-pointer" onClick={()=>ref.current.click()}>{children}</div>
          </>
          
  )
}

export default Upload
