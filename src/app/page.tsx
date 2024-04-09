'use client';

import { useState } from "react";
import RefImage from "./RefImage";

export default function Home() {
  const [file, setFile] = useState<Blob>()
  const [fileUrl, setFileUrl] = useState("")
  const [fileSubmitted, setFileSubmitted] = useState(false)

  function handleChange(event : any) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event : any) {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      if (e.target instanceof FileReader) {
        if (typeof e.target.result === "string") {
          setFileUrl(e.target.result);
          setFileSubmitted(true)
        }
      } 
    });
    if (file instanceof Blob) {  
      reader.readAsDataURL(file);
  
    }
    
  }

  return (
    <div>
      <input type="file" onChange={handleChange}/>
      <button type="button" onClick={handleSubmit}>upload</button>
      {fileSubmitted ? (
        <RefImage src={fileUrl}/>
      ) : (<div></div>)}
    </div>
  );
}

