import firebaseConfig from "./config"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth()
export const firebaseDb = getFirestore(firebaseApp)