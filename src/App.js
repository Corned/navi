
import { getAuth } from "firebase/auth"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearUser, setUser } from "state/slice/userSlice"
import ProfileEditorView from "views/ProfileEditor"

import SignInView from "views/SignIn"

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL } = user
        const { screenName } = user.reloadUserInfo
        dispatch(setUser({ displayName, photoURL, screenName }))
      } else { 
        dispatch(clearUser())
      }
    })

    return () => unsubscribe()
  }, [])
  
  return (
    <div className="App"> 

      {
        user
        ? <ProfileEditorView />
        : <SignInView />
      }

    </div>
  )
}

export default App
