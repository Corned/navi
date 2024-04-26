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
import { addLink, removeLink } from "state/slice/linksSlice"

const LinkForm = ({ linkData }) => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeLink(linkData.index))
  }

  const handleUpdate = () => {
    dispatch()
  }

  return (
    <div className="link-form">
      <div className="link-form-header">
        <p>
          <RiDraggable/>
          <span>Link #{ linkData.index }</span>
        </p>

        <button>remove</button>
      </div>

      <label for="link-platform">Platform</label>
      <select id="link-platform" name="link-platform">
        <option value="github">GitHub</option>
        <option value="youtube">YouTube</option>
        <option value="linkedin">LinkedIn</option>
        <option value="reddit">Reddit</option>
      </select>
      <label for="link-link">Link</label>
      <input name="link-link" defaultValue={linkData.url}></input>
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