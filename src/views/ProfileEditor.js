import Header from "components/Header"
import { useDispatch, useSelector } from "react-redux"

import {
  RiArrowRightLine,
  RiGithubFill,
  RiYoutubeFill,
  RiLinkedinBoxFill,
  RiRedditFill,
  RiLink,
  RiAddLine,
  RiDraggable,
} from "@remixicon/react"


import View from "views/View"

const ProfileEditorView = () => {
  const user = useSelector((state) => state.user)

  return (
    <View className="profile-editor">
      <Header />

      <main>
        <div className="preview-container">
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
              <div className="link-button github">
                <RiGithubFill size={20}/>
                <p>GitHub</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button youtube">
                <RiYoutubeFill size={20}/>
                <p>YouTube</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button linkedin">
                <RiLinkedinBoxFill size={20}/>
                <p>LinkedIn</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button reddit">
                <RiRedditFill size={20}/>
                <p>Reddit</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button custom">
                <RiLink size={20}/>
                <p>tmp.ooo</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button skeleton">

              </div>
            </div>


          </div>
        </div>




        <div className="composer">
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>

          <div className="link-form-container">
            <button className="outline">
              <RiAddLine/>
              <span>Add new link</span>
            </button>

            <div className="link-form">
              <div className="link-form-header">
                <p>
                  <RiDraggable/>
                  <span>Link #1</span>
                </p>

                <button>remove</button>
              </div>

              <label for="link-platform">Platform</label>
              <input name="link-platform"></input>
              <label for="link-link">Link</label>
              <input name="link-link"></input>
            </div>

          </div>
        </div>
      </main>
    </View>
  )
}

export default ProfileEditorView