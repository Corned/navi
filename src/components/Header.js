import {
  RiLink,
  RiLinksLine,
  RiProfileLine,
  RiGithubFill,
  RiLogoutBoxLine
} from "@remixicon/react"
import Logo from "./Logo"



const Header = () => {
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

{/*       {
        !user
        ? <button onClick={authWithGithub} className="outline">
            <RiGithubFill />
            <span>Authenticate with GitHub</span>
          </button>
        : <button onClick={logout1} className="outline">
        <RiLogoutBoxLine />
        <span>{ `Logged in as ${user.reloadUserInfo.screenName}`}</span>
      </button>
      }
 */}
      
    </header>
  )
}

export default Header