import { useEffect, useState } from "react"
import View from "./View"
import { useMatch } from "react-router-dom"

import { firebaseDb } from "fb"
import { collection, getDocs, query, where } from "firebase/firestore"

import platformData from "platformData"
import { RiArrowRightLine } from "@remixicon/react"

const ProfileView = () => {
  const [ profile, setProfile ] = useState(null)
  const { params } = useMatch("/:profile")

  
  useEffect(() => {
    const getProfile = async () => {
      const q = query(
        collection(firebaseDb, "profiles"),
        where("url", "==", params.profile)
      )

      const querySnapshot = await getDocs(q)
      const [ doc ] = querySnapshot.docs
      
      setProfile(doc.data())
    }

    getProfile()
  }, [ ])

  if (profile === null) {
    return <p>loading...</p>
  }

  return (
    <View className="profile">
      <div className="profile__links shadow">
      <h1>Corned</h1>

      {
        profile.links.map((linkData) => {
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
    </View>
  )
}

export default ProfileView