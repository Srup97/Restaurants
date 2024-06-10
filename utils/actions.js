import { firebaseApp } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    
} 