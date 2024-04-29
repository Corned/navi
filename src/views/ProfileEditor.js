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
  RiDiscordFill,
  RiGitlabFill,
  RiPaypalFill,
  RiTwitchFill,
  RiWordpressFill,
  RiXboxFill,
  RiPlaystationFill,
  RiErrorWarningFill,
  RiMicrosoftFill,
} from "@remixicon/react"


import View from "views/View"
import { addLink, removeLink, updateLink } from "state/slice/linksSlice"




const platformData = {
  "github": {
    name: "GitHub",
    icon: <RiGithubFill />,
    color: "rgb(25, 25, 25)",
  },
  "gitlab": {
    name: "GitLab",
    icon: <RiGitlabFill />,
    color: "#E2432A",
  },
  "youtube": {
    name: "YouTube",
    icon: <RiYoutubeFill />,
    color: "rgb(239, 56, 58)",
  },
  "linkedin": {
    name: "LinkedIn",
    icon: <RiLinkedinBoxFill />,
    color: "rgb(0, 119, 181)",
  },
  "reddit": {
    name: "Reddit",
    icon: <RiRedditFill />,
    color: "#FF5700",
  },
  "discord": {
    name: "Discord",
    icon: <RiDiscordFill />,
    color: "#5865F2",
  },
  "paypal": {
    name: "Paypal",
    icon: <RiPaypalFill />,
    color: "#00457C",
  },
  "twitch": {
    name: "Twitch",
    icon: <RiTwitchFill />,
    color: "#6441a5",
  },
  "wordpress": {
    name: "Wordpress",
    icon: <RiWordpressFill />,
    color: "rgb(33, 117, 155)",
  },
  "xbox": {
    name: "Xbox",
    icon: <RiXboxFill />,
    color: "#77bb44",
  },
  "playstation": {
    name: "Playstation",
    icon: <RiPlaystationFill />,
    color: "#092f94",
  },
  "microsoft": {
    name: "Microsoft",
    icon: <RiMicrosoftFill />,
    color: "#F14F21",
  }
}




const LinkForm = ({ linkData }) => {
  const dispatch = useDispatch()

  const { index } = linkData

  const handleDelete = () => {
    dispatch(removeLink(index))
  }

  const handleUpdate = (event) => {
    dispatch(updateLink({ index, service: event.target.value }))
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
      <select
        id="link-platform"
        name="link-platform"
        onChange={handleUpdate}
      >

        {

          Object.keys(platformData).map((platform) => {
            const { name } = platformData[platform]
            return <option value={platform}>{ name } </option>
          })

        }

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
                links.map(({ index, service, url }) => {
                  const { icon, name, color } = platformData[service] || {
                    icon: <RiErrorWarningFill/>,
                    name: "no platform set",
                    color: "rgb(200, 200, 200)",
                  }

                  return (
                    <div
                      className="link-button youtube"
                      style={{ "backgroundColor": color }}
                    >
                      { icon }
                      <span>{ name }</span>
                      <RiArrowRightLine size={20}/>
                    </div>
                  )
                })
              }
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