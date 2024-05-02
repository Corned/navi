import { useEffect } from "react"
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

import LinkForm from "./LinkForm"

const ProfileEditorView = () => {
  const links = useSelector((state) => state.links)
  const dispatch = useDispatch()

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(firebaseDb, "profiles", firebaseAuth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { links } = docSnap.data()

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
    })
  }

  return (
    <div className="profile-editor">
      <div className="profile-editor__nav card glass shadow">
        <button>
          <RiProfileLine size={20} />
          <span>Profile Details</span>
        </button>
        <button>
          <RiLinksLine size={20} />
          <span>Links</span>
        </button>
      </div>
      
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

        
{/*           <h2>Select your name</h2>
        <div className="profile-name__input">
          <p>{ window.location.origin + "/" }</p>
          <input
            placeholder="profile_name"
            onChange={handleProfileNameInput}
            value={profileName}
            />
        </div> */}

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
    </div>
  )
}

export default ProfileEditorView