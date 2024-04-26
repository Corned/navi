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

const SignInView = () => {
  return (
    <View className="center">
      <Container className="shadow login">
        <Logo size={50}/>

        <p>The Guide to Your Links</p>

        <div className="divider">
          <div className="line"></div>
          <p>Please log in</p>
          <div className="line"></div>
        </div>

        <div className="oauth2-options">
          <Button>
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