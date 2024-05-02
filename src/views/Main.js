import Profile from "components/Profile"
import Editor from "../components/Editor"

import Header from "components/Header"
import View from "views/View"

const Main = () => {
  return (
    <View className="main">
      <Header />
      <Profile />
      <Editor />
    </View>
  )
}

export default Main