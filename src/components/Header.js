import {
  RiLinksLine,
  RiProfileLine,
  RiLogoutBoxLine
} from "@remixicon/react"
import Logo from "./Logo"
import { useDispatch, useSelector } from "react-redux"

import { getAuth } from "firebase/auth"
import { signOut } from "firebase/auth"
import { clearUser } from "state/slice/userSlice"



const Header = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSignOut = () => {
    console.log("???");
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        dispatch(clearUser())
      })
  }

  return (
    <header>

      <Logo/>

      <nav>
        <button>
          <RiLinksLine size={20} />
          <span>Links</span>
        </button>
        <button>
          <RiProfileLine size={20} />
          <span>Profile Details</span>
        </button>
      </nav>

      <button onClick={handleSignOut} className="outline">
        <RiLogoutBoxLine />
        <span>{ `Logged in as ${user.screenName}`}</span>
      </button>

      
    </header>
  )
}

export default Header