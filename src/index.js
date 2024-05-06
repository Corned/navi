import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { store } from "state/config/store"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ProfileView from "views/Profile"

import "styles/index.scss"

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