import Header from "components/Header"
import { useDispatch, useSelector } from "react-redux"


import View from "views/View"

const ProfileEditorView = () => {
  const { user } = useSelector((state) => state)

  return (
    <View>
      <Header />
    </View>
  )
}

export default ProfileEditorView