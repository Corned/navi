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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/:user",
    element: <p>for da user :3</p>
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