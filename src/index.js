import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "styles/index.scss"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { store } from "state/config/store"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SignInView from "views/SignIn"
import ProfileView from "views/Profile"




const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/:user",
    element: <ProfileView />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)