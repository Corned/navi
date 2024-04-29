import Header from "components/Header"
import { useDispatch, useSelector } from "react-redux"

import {
  RiArrowRightLine,
  RiAddLine,
  RiErrorWarningFill,
} from "@remixicon/react"


import View from "views/View"
import { addLink, removeLink, updateLink } from "state/slice/linksSlice"
import platformData from "platformData"
import PlatformPicker from "components/PlatformPicker"
import { useState } from "react"

const LinkForm = (linkData) => {

  const [ data, setData ] = useState()

  const handleChange = (platformName) => {
    setData(platformData[platformName.toLowerCase()])
  }

  return (
    <div className="link-form">
      
      <div className="link-form__header">
        <h2>Link #1</h2>
      </div>

      <PlatformPicker selected={data} setSelected={handleChange} />
      <input />

    </div>
  )
}


const ProfileEditorView = () => {
  const user = useSelector((state) => state.user)
  const links = useSelector((state) => state.links)
  const dispatch = useDispatch()  

  const handleNew = () => {
    dispatch(addLink())
  }

  return (
    <View className="profile-editor">
      <Header />

      <main>
        <div className="preview-container shadow">
          <div className="preview">
            <div className="user-data">
              {
                user
                ? <img className="user-picture" alt="icon" src={user.photoURL} />
                : <div className="user-picture"></div>
              }

              {
                user
                ? <h1>{ user.screenName }</h1>
                : <div className="user-name"></div>
              }

              <div className="user-description"></div>
            </div>

            <div className="buttons">

              {
                links.map((linkData) => {
                  const { icon, platform, color } = platformData[
                    linkData.platform.toLowerCase()
                  ]

                  return (
                    <div
                      className="link-button youtube"
                      style={{ "backgroundColor": color }}
                    >
                      { icon }
                      <span>{ platform }</span>
                      <RiArrowRightLine size={20}/>
                    </div>
                  )
                })
              }

              { links.length === 0 && (
                <>
                  <div className="link-button skeleton">
                  </div>
                  <div className="link-button skeleton">
                  </div>
                  <div className="link-button skeleton">
                  </div>
                </>
              )}
            </div>


          </div>
        </div>




        <div className="composer shadow">
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>

          <div className="link-form-container">
            <button className="outline" onClick={handleNew}>
              <RiAddLine/>
              <span>Add new link</span>
            </button>

            {
              links.map((linkData) => <LinkForm linkData={linkData} />)
            }


          </div>
        </div>
      </main>
    </View>
  )
}

export default ProfileEditorView