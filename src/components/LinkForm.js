import { useDispatch } from "react-redux"

import { RiCloseCircleLine } from "@remixicon/react"

import { removeLink, updateLink } from "state/slice/linksSlice"
import PlatformPicker from "components/PlatformPicker"
import { useEffect, useState } from "react"

const LinkForm = ({ linkData }) => {
  const [ data, setData ] = useState(linkData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateLink(data))
  }, [ dispatch, data ])

  const handlePlatformInput = (platformName) => {
    setData({
      ...data,
      platform: platformName,
    })
  }

  const handleUrlInput = (event) => {
    setData({
      ...data,
      url: event.target.value,
    })
  }

  const handleAltLabelInput = (event) => {
    setData({
      ...data,
      altLabel: event.target.value,
    })
  }

  const handleRemoval = (id) => {
    dispatch(removeLink({ id }))
  }

  return (
    <div className="link-form">
      <div className="link-form__header">
        <h2>Link for {data.platform}</h2>

        <button onClick={() => handleRemoval(data.id)}>
          <RiCloseCircleLine />
          <span>remove</span>
        </button>
      </div>

      <PlatformPicker selected={data} setSelected={handlePlatformInput} />
      <input
        value={data.url}
        onChange={handleUrlInput}
        placeholder="Enter your URL here"
        spellCheck="false"
      />
      <input
        value={data.altLabel}
        onChange={handleAltLabelInput}
        placeholder="Alternate label for link button"
        spellCheck="false"
      />

    </div>
  )
}

export default LinkForm