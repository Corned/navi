import {
  RiLink,
  RiLinksLine,
  RiProfileLine,
  RiArrowRightLine,

  RiGithubFill,
  RiYoutubeFill,
  RiLinkedinBoxFill,
  RiRedditFill,

  RiAddLine,
  RiDraggable,

  RiLogoutBoxLine
} from "@remixicon/react"

import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { useEffect } from "react";

const provider = new GithubAuthProvider()


function App() {

  const authWithGithub = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log("logged in as ", user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage);
      });
  }

  const logout1 = () => {
    const auth = getAuth();
    console.log("CURRENT USER", auth.currentUser, "logging out");
    signOut(auth).then(function() {
      // Sign-out successful.
      console.log("sign out success!");
    }).catch(function(error) {
      // An error happened.
      console.log("sign out ERROR")
    });
  }


  useEffect(() => {
    
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      console.log("onAuthStateChange", user);
      if (user) {
          // ...your code to handle authenticated users. 
      } else {
          // No user is signed in...code to handle unauthenticated users. 
      }
    })

    return () => unsubscribe()
  }, [])
  


  return (
    <div className="App">
      
      <header>
        <div className="logo">
          <RiLink size={30} />
          <p>navi</p>
        </div>

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

        <button onClick={logout1} className="outline">
          <RiLogoutBoxLine />
          <span>Logout</span>
        </button>

        <button onClick={authWithGithub} className="outline">
          <RiGithubFill />
          <span>Authenticate with GitHub</span>
        </button>
      </header>

      <main>
        <div className="preview-container">
          <div className="preview">
            <div className="user-data">
              <div className="user-picture"></div>
              <div className="user-name"></div>
              <div className="user-description"></div>
            </div>

            <div className="buttons">
              <div className="link-button github">
                <RiGithubFill size={20}/>
                <p>GitHub</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button youtube">
                <RiYoutubeFill size={20}/>
                <p>YouTube</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button linkedin">
                <RiLinkedinBoxFill size={20}/>
                <p>LinkedIn</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button reddit">
                <RiRedditFill size={20}/>
                <p>Reddit</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button custom">
                <RiLink size={20}/>
                <p>tmp.ooo</p>
                <RiArrowRightLine size={20}/>
              </div>
              <div className="link-button skeleton">

              </div>
            </div>


          </div>
        </div>




        <div className="composer">
          <h1>Customize your links</h1>
          <p>Add/edit/remove links below and then share all your profiles with the world!</p>

          <div className="link-form-container">
            <button className="outline">
              <RiAddLine/>
              <span>Add new link</span>
            </button>

            <div className="link-form">
              <div className="link-form-header">
                <p>
                  <RiDraggable/>
                  <span>Link #1</span>
                </p>

                <button>remove</button>
              </div>

              <label for="link-platform">Platform</label>
              <input name="link-platform"></input>
              <label for="link-link">Link</label>
              <input name="link-link"></input>
            </div>

          </div>
        </div>
      </main>


    </div>
  )
}

export default App
