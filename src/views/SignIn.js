import { useDispatch, useSelector } from "react-redux"


import View from "views/View"
import Container from "components/Container"
import Logo from "components/Logo"
import Button from "components/Button"

import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiGoogleFill,
  RiTwitterXFill,
  RiAppleFill,
  RiMicrosoftFill,
} from "@remixicon/react"

import { setUser } from "../state/slice/userSlice"
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const SignInView = () => {
  const { user } = useSelector((state) => state)

  const dispatch = useDispatch()

  const signInWithGithub = () => {
    const auth = getAuth()

    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("logged in as ", user);
        const { displayName, photoURL } = user
        const { screenName } = user.reloadUserInfo

        dispatch(setUser({ displayName, photoURL, screenName }))

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <View className="center">
      <Container className="shadow login">
        <Logo size={50}/>

        <p>The Guide to Your Links</p>

        <div className="divider">
          <div className="line"></div>
          <p>log in with</p>
          <div className="line"></div>
        </div>

        <div className="oauth2-options">
          <Button onClick={signInWithGithub}>
            <RiGithubFill />
            <span>GitHub</span>
          </Button>
          <Button disabled>
            <RiLinkedinBoxFill />
            <span>LinkedIn</span>
          </Button>
          <Button disabled>
            <RiGoogleFill />
            <span>Google</span>
          </Button>

          <Button disabled>
            <RiMicrosoftFill />
            <span>Microsoft</span>
          </Button>
          <Button disabled>
            <RiTwitterXFill />
            <span>Twitter</span>
          </Button>
          <Button disabled>
            <RiAppleFill />
            <span>Apple</span>
          </Button>
        </div>
      </Container>
    </View>
  )
}

export default SignInView