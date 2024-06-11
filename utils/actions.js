import { firebaseApp } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
} 

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
}


export const registerNewUser = async (email, password) => {
    const result = {statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.error = "Este correo ya ha sido registrado"
    }
    return result
}

export const closeSesion = () => {
    return firebase.auth().signOut();
}

