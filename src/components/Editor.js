import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore"

import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage"

import {
  RiAddLine,
  RiSave3Line,
  RiLinksLine,
  RiProfileLine,
} from "@remixicon/react"

import { firebaseAuth, firebaseDb } from "fb"
import { addLink, loadLinks} from "state/slice/linksSlice"
import { updateProfile } from "state/slice/profileSlice"

import LinkForm from "./LinkForm"
import LabelInput from "./LabelInput"
import FileInput from "./FileInput"

const ProfileEditorView = () => {
  const links = useSelector((state) => state.links)
  const profile = useSelector((state) => state.profile)

  // Used to navigate between the "profile details"
  // and the "links" pages.
  const [ navState, setNavState ] = useState("profile")

  // State for detecting if user wants to change their
  // profile url.
  const [ originalProfileUrl, setOriginalProfileUrl ] = useState("")

  
  const dispatch = useDispatch()

  useEffect(() => {
    // Load user's profile based on uid
    const getProfile = async () => {
      const q = query(
        collection(firebaseDb, "profiles"),
        where("uid", "==", firebaseAuth.currentUser.uid)
      )

      const querySnapshot = await getDocs(q)
      const [ doc ] = querySnapshot.docs
      
      //! Doc may not exist 😱
      if (doc?.exists()) {
        const { links, name, bio, url } = doc.data()

        setOriginalProfileUrl(url)
        dispatch(updateProfile({ name, bio, url }))
        dispatch(loadLinks(links))
      }
    }

    // Refactor
    const getProfilePicture = () => {
      const storage = getStorage()
      const profilePictureRef = ref(
        storage,
        `pfp/${firebaseAuth.currentUser.uid}`
      )

      listAll(profilePictureRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef)
            .then((profilePictureUrl) => {
              dispatch(updateProfile({ picture: profilePictureUrl }))
            })
          })
        })
    }

    getProfile()
    getProfilePicture()
  }, [ ])

  const handleNewLink = () => {
    dispatch(addLink())
  }

  const handleSave = async () => {
    let newProfilePictureUrl = null

    // handle profile picture upload
    // If profile.picture starts with "blob:",
    // user is trying to upload a new profile picture.
    if (profile?.picture.startsWith("blob:")) {
      const blob = await fetch(profile.picture).then(r => r.blob());
      const [ _, fileType  ] = blob.type.split("/")
      const filePath = `pfp/${firebaseAuth.currentUser.uid}/profile_picture.${fileType}`
      
      const storage = getStorage()
      const profilePictureRef = ref(storage, filePath)
      
      const snapshot = await uploadBytes(profilePictureRef, blob)
      newProfilePictureUrl = await getDownloadURL(snapshot.ref)
    }
    const batch = writeBatch(firebaseDb)

    // Check if user already has profile.
    // If profile exists, check if url has changed.
    // If it has, delete.
    {
      const q = query(
        collection(firebaseDb, "profiles"),
        where("uid", "==", firebaseAuth.currentUser.uid)
      )
  
      const querySnapshot = await getDocs(q)
      const [ existingDoc ] = querySnapshot.docs
    
      if (existingDoc?.exists()) {        
        const { url } = existingDoc.data()
        if (url && url !== profile.url) {
          batch.delete(doc(firebaseDb, "profiles", url))
        }
      }
    }


    if (profile.url) {
      const newRef = doc(firebaseDb, "profiles", profile.url)
      batch.set(newRef, {
        links,
        name: profile.name,
        bio: profile.bio,
        url: profile.url,
        picture: newProfilePictureUrl || profile.picture,
        uid: firebaseAuth.currentUser.uid,
      })
    }

    // Batch commit will fail if user tries to update
    // profile picture to existing one?
    try {
      await batch.commit()
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleNameChange = (event) => {
    dispatch(updateProfile({ name: event.target.value }))
  }

  const handleBioChange = (event) => {
    dispatch(updateProfile({ bio: event.target.value }))
  }

  const handleUrlChange = (event) => {
    dispatch(updateProfile({ url: event.target.value }))
  }

  const handleProfilePictureChange = (file) => {
    dispatch(updateProfile({ picture: file }))
  }

  const validateUrl = (event) => {  
    const regex = /^\w{3,32}$/gm
    return {
      valid: regex.test(event.target.value),
      errorMessage: "between 3-32 alphanumeric characters"
    }
  }

  const validateDisplayName = (event) => {
    return {
      valid: event.target.value.length >= 2 
             && event.target.value.length <= 100,
      errorMessage: "between 2-100 characters"
    }
  }
  

  return (
    <div className="profile-editor">
      <div className="profile-editor__nav card glass shadow">
        <button className={navState === "profile" && "selected"} onClick={() => setNavState("profile")}>
          <RiProfileLine size={20} />
          <span>Profile Details</span>
        </button>
        <button className={navState === "links" && "selected"} onClick={() => setNavState("links")}>
          <RiLinksLine size={20} />
          <span>Links</span>
        </button>
      </div>

      
      {
        navState === "profile" && (
          <div className="profile-editor__profile card glass shadow">

            <div>
              <h1>Tell people about yourself</h1>
              <p>Change your name and profile picture. Customize your personal Navi URL! Share an interesting fact about yourself. </p>
              <div className="profile-editor__actions">
                <button className="outline" onClick={handleSave}>
                  <RiSave3Line/>
                  <span>Save</span>
                </button>
              </div>
            </div>

            <FileInput
              value={profile.picture}
              setValue={handleProfilePictureChange}
            />

            <LabelInput
              label={`${window.location.origin}/`}
              onChange={handleUrlChange}
              validate={validateUrl}
              placeholder="Your unique URL"
              value={profile.url}
            />

            <LabelInput
              label="Display name"
              onChange={handleNameChange}
              validate={validateDisplayName}
              placeholder="You can call yourself anything!"
              value={profile.name}
            />

            <textarea
              onChange={handleBioChange}
              value={profile.bio}
              placeholder="Tell about yourself in 1000 characters or less!"
              maxLength={1000}
            />
          </div>
        )
      }

      {
        navState === "links" && (
          <div className="profile-editor__links card glass shadow">
            <h1>Customize your links</h1>
            <p>Add/edit/remove links below and then share all your profiles with the world!</p>

            <div className="profile-editor__actions">
              <button className="outline" onClick={handleNewLink}>
                <RiAddLine/>
                <span>Add new link</span>
              </button>
              <button className="outline" onClick={handleSave}>
                <RiSave3Line/>
                <span>Save</span>
              </button>
            </div>

            <div className="link-form-container">
              {
                links.map((linkData) =>
                <LinkForm
                  linkData={linkData}
                  key={linkData.id}
                />)
              }
            </div>

          </div>
        )
      }
      
    </div>
  )
}

export default ProfileEditorView