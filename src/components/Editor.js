import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"

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

const ProfileEditorView = () => {
  const links = useSelector((state) => state.links)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [ navState, setNavState ] = useState("profile")

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(firebaseDb, "profiles", firebaseAuth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { links, name, bio, url } = docSnap.data()

        dispatch(updateProfile({ name, bio, url }))
        dispatch(loadLinks(links))
      }
    }

    getProfile()
  }, [ ])

  const handleNew = () => {
    dispatch(addLink())
  }

  const handleSave = async () => {
    const profilesRef = collection(firebaseDb, "profiles")

    await setDoc(doc(profilesRef, firebaseAuth.currentUser.uid), {
      links,
      name: profile.name,
      bio: profile.bio,
    })
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

  return (
    <div className="profile-editor">
      <div className="profile-editor__nav card glass shadow">
        <button className="selected" onClick={() => setNavState("profile")}>
          <RiProfileLine size={20} />
          <span>Profile Details</span>
        </button>
        <button onClick={() => setNavState("links")}>
          <RiLinksLine size={20} />
          <span>Links</span>
        </button>
      </div>

      {
        navState === "profile" && (
          <div className="profile-editor__profile card glass shadow">
            <h1>Tell people about yourself</h1>
            <p>Change your name and profile picture. Customize your personal Navi URL! Share an interesting fact about yourself. </p>
            <div className="profile-editor__actions">
              <button className="outline" onClick={handleSave}>
                <RiSave3Line/>
                <span>Save</span>
              </button>
            </div>

            <LabelInput
              label={`${window.location.origin}/`}
              onChange={handleUrlChange}
              value={profile.url}
            />

            <LabelInput
              label="Display name"
              onChange={handleNameChange}
              value={profile.name}
            />

            <textarea
              onChange={handleBioChange}
              value={profile.bio}
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
              <button className="outline" onClick={handleNew}>
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