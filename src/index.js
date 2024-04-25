import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "styles/index.scss"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

/* const getLinks = async () => {
  const linkCol = collection(db, "private-collection")
  const linkSnapshot = await getDocs(linkCol)
  const linkList = linkSnapshot.docs.map(doc => doc.data())

  console.log(linkList);
}

(async () => {
  await getLinks()
})() */

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)