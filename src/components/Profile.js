import { useSelector } from "react-redux"

import { RiArrowRightLine } from "@remixicon/react"

import platformData from "platformData"

const Profile = ({ userdata }) => {
  const profile = useSelector((state) => state.profile)
  const links = useSelector((state) => state.links)

  const profileToView = userdata || profile
  const linksToView = userdata?.links || links

  return (
    <div className="profile card glass shadow">
      <div className="profile__user-data">
        {
          profileToView.picture
          ? (
            <img
              className="user-picture"
              alt="icon"
              src={profileToView.picture}
            />
          )
          : <div className="user-picture skeleton"></div>
        }

        {
          profileToView.name
          ? <h1 className="user-name skeleton">{ profileToView.name }</h1>
          : <div className="user-name skeleton"></div>
        }

        {
          profileToView.bio
          ? <p className="profile__bio">{ profile.bio }</p>
          : <div className="profile__bio skeleton"></div>
        }
      </div>

      <div className="profile__links">
      {
        linksToView.map((linkData) => {
          const { platform, url, altLabel } = linkData
          const color = platformData[platform.toLowerCase()].color

          return (
            <a
              className="link-button"
              href={url}
              rel="noreferrer"
              target="_blank"
              style={{ backgroundColor: color }}
            >
              { platformData[platform.toLowerCase()].icon }
              <span>{ altLabel || platform }</span>
              <RiArrowRightLine />
            </a>
          )
        })
      }
      </div>
    </div>
  )
}

export default Profile