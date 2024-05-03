import { useEffect, useState } from "react"
import View from "./View"
import { useMatch } from "react-router-dom"

import { firebaseDb } from "fb"
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage"

import { firebaseAuth } from "fb"
import { useDispatch } from "react-redux"
import { updateProfile } from "state/slice/profileSlice"

import Profile from "components/Profile"

const ProfileView = () => {
  const [ userdata, setUserdata ] = useState(null)
  const { params } = useMatch("/:profileUrl")
  const dispatch = useDispatch()

  
  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(firebaseDb, "profiles", params.profileUrl)
      const docSnap = await getDoc(docRef)

      setUserdata(docSnap.data())

      const storage = getStorage()
      const profilePictureRef = ref(
        storage,
        `pfp/${docSnap.data().uid}`
      )
  
      listAll(profilePictureRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            console.log(itemRef);
  
            getDownloadURL(itemRef)
            .then((url) => {
              dispatch(updateProfile({ picture: url }))
            })
          })
        })
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