
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { useEffect, useState } from "react"

import SignInView from "views/SignIn"

const provider = new GithubAuthProvider()


function App() {

  const [ user, setUser ] = useState(null)

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
        setUser(user)
      } else {
          // No user is signed in...code to handle unauthenticated users. 
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])
  


  return (
    <div className="App"> 


      <SignInView />



    </div>
  )
}

export default App
