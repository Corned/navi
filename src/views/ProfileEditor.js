import Header from "components/Header"
import { useDispatch, useSelector } from "react-redux"

import {
  RiArrowRightLine,
  RiAddLine,
  RiErrorWarningFill,
  RiCloseCircleLine,
  RiSave3Line,
} from "@remixicon/react"

import View from "views/View"
import { addLink, removeLink, updateLink, loadLinks} from "state/slice/linksSlice"
import platformData from "platformData"
import PlatformPicker from "components/PlatformPicker"
import { useEffect, useState } from "react"


import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, getDoc, where, query} from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { firebaseAuth, firebaseDb } from "fb"

const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})

const db = getFirestore(app)




const LinkForm = ({ linkData }) => {
  const [ data, setData ] = useState(linkData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateLink(data))
  }, [ dispatch, data ])

  const handlePlatformInput = (platformName) => {
    setData({
      ...data,
      platform: platformName,
    })
  }

  const handleUrlInput = (event) => {
    setData({
      ...data,
      url: event.target.value,
    })
  }

  const handleAltLabelInput = (event) => {
    setData({
      ...data,
      altLabel: event.target.value,
    })
  }

  const handleRemoval = (id) => {
    dispatch(removeLink({ id }))
  }

  return (
    <div className="link-form">
      <div className="link-form__header">
        <h2>Link for {data.platform}</h2>

        <button onClick={() => handleRemoval(data.id)}>
          <RiCloseCircleLine />
          <span>remove</span>
        </button>
      </div>

      <PlatformPicker selected={data} setSelected={handlePlatformInput} />
      <input
        value={data.url}
        onChange={handleUrlInput}
        placeholder="Enter your URL here"
        spellCheck="false"
      />
      <input
        value={data.altLabel}
        onChange={handleAltLabelInput}
        placeholder="Alternate label for link button"
        spellCheck="false"
      />

    </div>
  )
}


const ProfileEditorView = () => {
  const user = useSelector((state) => state.user)
  const links = useSelector((state) => state.links)
  const [ profileName, setProfileName ] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const getProfile = async () => {
      const docRef = doc(firebaseDb, "profiles", firebaseAuth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { url, links } = docSnap.data()

        dispatch(loadLinks(links))
        setProfileName(url)
      }
    }

    getProfile()
  }, [ ])

  const handleNew = () => {
    dispatch(addLink())
  }

  const handleSave = async () => {
    const auth = getAuth()

    const profilesRef = collection(db, "profiles")

    await setDoc(doc(profilesRef, auth.currentUser.uid), {
      url: profileName,
      links,
    })
  }

  const handleProfileNameInput = (event) => {
    setProfileName(event.target.value)
  }

  return (
    <View className="profile-editor">
      <Header />

      <main>
        <div className="preview-container shadow">
          <div className="preview">
            <div className="user-data">
              {
                user
                ? <img className="user-picture" alt="icon" src={user.photoURL} />
                : <div className="user-picture"></div>
              }

              {
                user
                ? <h1>{ user.screenName }</h1>
                : <div className="user-name"></div>
              }

              <div className="user-description"></div>
            </div>

            <div className="buttons">

              {
                links.map((linkData) => {
                  const { icon, platform, color } = platformData[
                    linkData.platform.toLowerCase()
                  ]

                  return (
                    <div
                      className="link-button youtube"
                      style={{ "backgroundColor": color }}
                    >
                      { icon }
                      {
                        linkData?.altLabel
                        ? <span>{ linkData.altLabel }</span>
                        : <span>{ platform }</span>
                      }
                      <RiArrowRightLine size={20}/>
                    </div>
                  )
                })
              }

              { links.length === 0 && (
                <>
                  <div className="link-button skeleton">
                  </div>
                  <div className="link-button skeleton">
                  </div>
                  <div className="link-button skeleton">
                  </div>
                </>
              )}
            </div>


          </div>
        </div>




        <div className="composer shadow">
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>

          <div className="link-form-container">
            <button className="outline" onClick={handleNew}>
              <RiAddLine/>
              <span>Add new link</span>
            </button>
            <button className="outline" onClick={handleSave}>
              <RiSave3Line/>
              <span>Save</span>
            </button>

            <div className="profile-name__input">
              <p>{ window.location.origin + "/" }</p>
              <input
                placeholder="profile_name"
                onChange={handleProfileNameInput}
                value={profileName}
              />
            </div>

            {
              links.map((linkData) =>
              <LinkForm
                linkData={linkData}
                key={linkData.id}
              />)
            }


          </div>
        </div>
      </main>
    </View>
  )
}

export default ProfileEditorView