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
  RiQuestionMark,
  RiListView,
  RiGridFill,
} from "@remixicon/react"


import View from "views/View"
import { addLink, removeLink, updateLink } from "state/slice/linksSlice"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"




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


const CustomPlatformPicker = (props) => {
  const [ selected, setSelected ] = useState(props.defaultValue)
  const [ filter, setFilter ] = useState("")
  const [ isOpen, setOpen ] = useState(false)
  const [ isList, setList ] = useState(true)

  const pickerRef = useRef(null)

  useEffect(() => {
    const clickEventHandler = (event) => {
      if (!event.target) return

      const contains = pickerRef.current.contains(event.target)
      if (contains) return

      setOpen(false)
    }

    if (pickerRef.current) {
      document.addEventListener("click", clickEventHandler)
    }

    return () => {
      document.removeEventListener("click", clickEventHandler)
    }
  }, [ pickerRef, isOpen ])

  const setOpenState = (newState) => () => setOpen(newState)
  const setListState = (newState) => () => setList(newState)
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const listButtonClasses = classNames({ "selected": isList })
  const gridButtonClasses = classNames({ "selected": !isList })
  const optionButtonClasses = classNames({ "justify-left": isList })
  const optionClasses = classNames("platform-picker__options", {
    "list": isList,
    "grid": !isList,
  })

  const filteredServices = Object.values(platformData)
    .filter((serviceData) => {
      return serviceData.name.toLowerCase()
        .includes(filter.toLowerCase())
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

  return (
    <div className="platform-picker" ref={pickerRef}>
      <button onClick={setOpenState(true)}>
        <RiQuestionMark />
        <span>Select a service</span>
      </button>

      {
        isOpen && (
          <div className="platform-picker__dropdown">
            <div className="platform-picker__format">
              <input
                value={filter}
                onChange={handleFilter}
                placeholder="e.g. LinkedIn"
              />
              <button
                className={listButtonClasses}
                onClick={setListState(true)}
              >
                <RiListView />
                <span>List</span>
              </button>
              <button
                className={gridButtonClasses}
                onClick={setListState(false)}
              >
                <RiGridFill />
                <span>Grid</span>
              </button>
            </div>

            <div className="divider"></div>

            <div className={optionClasses}>
              {
                filteredServices.map(({ name, icon, color }) => {
                  return (
                    <button
                      className={optionButtonClasses}
                      style={{ color }}
                      onClick={() => setSelected(name)}
                    >
                      { icon }
                      { isList && <span>{ name }</span> }
                    </button>
                  )
                })
              }

            </div>

          </div>
        )
      }
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

{/*             {
              links.map((linkData) => <LinkForm linkData={linkData} />)
            } */}

            <CustomPlatformPicker />

          </div>
        </div>
      </main>
    </View>
  )
}

export default ProfileEditorView