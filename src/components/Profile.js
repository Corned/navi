import { useDispatch, useSelector } from "react-redux"

import {
  RiArrowRightLine,
} from "@remixicon/react"

import platformData from "platformData"

const Profile = () => {
  const profile = useSelector((state) => state.profile)
  const links = useSelector((state) => state.links)

  console.log(profile);

  return (
    <div className="profile shadow">
        <div className="profile__user-data">
          {
            profile.picture
            ? (
              <img
                className="user-picture"
                alt="icon"
                src={profile.picture}
              />
            )
            : <div className="user-picture skeleton"></div>
          }

          {
            profile.name
            ? <h1 className="user-name skeleton">{ profile.name }</h1>
            : <div className="user-name skeleton"></div>
          }

          {
            profile.bio
            ? <p className="profile__bio">{ profile.bio }</p>
            : <div className="profile__bio skeleton"></div>
          }
        </div>

        <div className="profile__links">
        {
          links.map((linkData) => {
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