
import { IKImage } from 'imagekitio-react';
function Image({src , className , h  , w  , alt}) {
  return (
    <IKImage urlEndpoint = {import.meta.env.VITE_IK_URL_ENDPOINT}
    className={className}
    height= {h}
    width={w}
    path={src}
    alt={alt}
    loading= 'lazy'
    lqip ={{active:true , quality:20}}
     />
  )
}

export default Image
