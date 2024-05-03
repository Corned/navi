import { useEffect, useState } from "react"
import View from "./View"
import { useMatch } from "react-router-dom"

import { firebaseDb } from "fb"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"

import Profile from "components/Profile"

const ProfileView = () => {
  const [ userdata, setUserdata ] = useState(null)
  const { params } = useMatch("/:profileUrl")
  
  useEffect(() => {
    const getProfile = async () => {

      const docRef = doc(firebaseDb, "profiles", params.profileUrl)
      const docSnap = await getDoc(docRef)

      setUserdata(docSnap.data())

      console.log(docSnap.data());
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