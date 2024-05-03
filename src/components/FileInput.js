import { useState } from "react"
import { RiFileImageLine, RiUpload2Line } from "@remixicon/react"

const FileInput = () => {
  const [ file, setFile ] = useState(null)
  
  const handleChange = (event) => {
    const [ newFile ] = event.target.files

    console.log(newFile);
    setFile(newFile)
  }

  const dropHandler = (event) => {
    event.preventDefault()
    console.log("Dropped a file into the file zone!");
    const [ item ] = [ ...event.dataTransfer.items ]
    const newFile = item.getAsFile()
    setFile(newFile)

    console.log(newFile);
  }
  
  const dragOverHandler = (event) => {
    event.preventDefault()
    console.log("Hovering over the file zone!");
    
  }

  return (
    <label
      className="file-input"
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      for="profile-image-upload"
    >
      <img
        alt=""
        src={file && URL.createObjectURL(file)}
      />

      <div className="file-input__helper">

        {
          !file ? (
            <>
              <RiUpload2Line size={32}/>
              <p>Drag and Drop your picture here or <span>browse files</span></p>
            </>
          ) : (
            <p>{file.name}</p>
          )
        }

      </div>

      <input
        name="profile-image-upload"
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}>
      </input>
    </label>
  )
}

export default FileInput