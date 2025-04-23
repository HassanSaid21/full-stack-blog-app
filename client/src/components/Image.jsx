import { IKImage } from "imagekitio-react";
function Image({ src, className, h, w, alt }) {
  return (
    <IKImage
      
      className={className}
      height={h}
      width={w}
      path={src}
      alt={alt}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      transformation={[{ width: w, height: h }]}
    />
  );  
}

export default Image;
