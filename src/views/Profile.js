import { useEffect, useState } from "react"
import View from "./View"
import { useMatch } from "react-router-dom"

import { firebaseDb } from "fb"
import { collection, getDocs, query, where } from "firebase/firestore"

import Profile from "components/Profile"

const ProfileView = () => {
  const [ userdata, setUserdata ] = useState(null)
  const { params } = useMatch("/:profile")
  
  useEffect(() => {
    const getProfile = async () => {
      const q = query(
        collection(firebaseDb, "profiles"),
        where("url", "==", params.profile)
      )

      const querySnapshot = await getDocs(q)
      const [ doc ] = querySnapshot.docs
      
      setUserdata(doc.data())

      console.log(doc.data());
    }

    getProfile()
  }, [ ])

  if (userdata === null) {
    return <p>loading...</p>
  }

  return (
    <View className="view-profile">
      <Profile userdata={userdata}/>
    </View>
  )
}

export default ProfileView