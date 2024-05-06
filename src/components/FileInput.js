import { useState } from "react"
import { RiFileImageLine, RiUpload2Line } from "@remixicon/react"

const FileInput = ({ value, setValue }) => {
  const [ fileName, setFileName ] = useState(null)

  const handleFile = (file) => {
    const objectUrl = URL.createObjectURL(file)
    setFileName(file.name)
    setValue(objectUrl)
  }

  const handleChange = (event) => {
    const [ file ] = event.target.files
    handleFile(file)
  }

  const dropHandler = (event) => {
    event.preventDefault()
    console.log("Dropped a file into the file zone!");
    const [ item ] = [ ...event.dataTransfer.items ]
    const file = item.getAsFile()
    handleFile(file)
  }
  
  const dragOverHandler = (event) => {
    event.preventDefault()    
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
        src={value}
      />

      <div className="file-input__helper">

        {
          !fileName ? (
            <>
              <RiUpload2Line size={32}/>
              <p>Drag and Drop your picture here or <span>browse files</span></p>
            </>
          ) : (
            <p>{fileName}</p>
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