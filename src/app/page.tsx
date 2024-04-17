'use client';

import { useState, useEffect } from "react";
import RefImage from "./RefImage";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AnimatePresence, motion } from "framer-motion";

interface ImagePropType {
  fileUrl: string;
  id: number;
}

const acceptedFiles = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
];

export default function Home() {
  const [fileTransfer, setFileTransfer] = useState<Blob[]>();
  const [imageProps, setImageProps] = useState<ImagePropType[]>([]);
  const [isImageDragging, setIsImageDragging] = useState(true);
  const [idCount, setIdCount] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    console.log(fileTransfer);
    if (fileTransfer === undefined) {
      return;
    }

    var i = 0;

    while (i < fileTransfer.length) {
      var file = fileTransfer[i];
      i++;
      if (!(acceptedFiles.includes(file.type))) {
        continue;
      }
      const reader = new FileReader();

      // TODO  fix dragging multiple files
      reader.addEventListener('load', (e) => {
        if (e.target instanceof FileReader) {
          if (typeof e.target.result === "string") {
            setImageProps([...imageProps, {fileUrl: e.target.result, id:idCount}]);
            setIdCount(idCount + 1);
            setIsImageDragging(false);
          }
        } 
      });

      if (file instanceof Blob) {
        reader.readAsDataURL(file);
        console.log("new image");
      }

      
    }
    
  }, [fileTransfer]);

  function handleOnDrop(event : any) {
    event.stopPropagation();
    event.preventDefault();
    const {files} = event.dataTransfer;
    setFileTransfer(files);
  }

  function handleOnDragOver(event : any) {
    event.stopPropagation();
    event.preventDefault();
  }

  function handleImageOnDragStart(event : any) {
    setIsImageDragging(true);
  }

  function handleImageOnDragEnd(event : any) {
    setIsImageDragging(false);
  }

  function handleOnTransform(event : any){
    setScale(event.instance.transformState.scale); // output scale factor
  }

  function handleOnDelete(id : number){
    console.log("id")
    setImageProps(imageProps.filter((imageProp) => imageProp.id !== id)); // output scale factor
  }
  // Order  of array is the arrangement of files

  return (
    <div 
      id="drop_zone"
      className="bg-zinc-700 h-screen w-screen"
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      >
      <TransformWrapper limitToBounds={false} disabled={isImageDragging} minScale={0.20} maxScale={10} onTransformed={handleOnTransform}>
        <TransformComponent>
          <div id="wrapper" className="h-screen w-screen">
            <AnimatePresence>
              {(imageProps.length === 0) && (
                <motion.div
                  initial={{ scale: 0.5, y: 300, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.5, y: 300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    duration: 0.5,
                    delay: 0,
                    bounce: 0.2
                  }}
                >
                  <p className="h-screen flex items-center justify-center">Drag and Drop your Images!</p>
                </motion.div>
              )}
            </AnimatePresence>
            {imageProps.map(imageProp => 
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <RefImage 
                  key={imageProp.id} 
                  id={imageProp.id}
                  src={imageProp.fileUrl}
                  scale={scale}
                  onDragStart={handleImageOnDragStart}
                  onDragStop={handleImageOnDragEnd}
                  onDelete={handleOnDelete}
                ></RefImage>
              </motion.div>
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

