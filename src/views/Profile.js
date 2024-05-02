import { useEffect, useState } from "react"
import View from "./View"
import { useMatch } from "react-router-dom"

import { firebaseDb } from "fb"
import { collection, getDocs, query, where } from "firebase/firestore"

import platformData from "platformData"
import { RiArrowRightLine } from "@remixicon/react"
import Profile from "components/Profile"

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
    <View className="view-profile">
      <Profile />
    </View>
  )
}

export default ProfileView