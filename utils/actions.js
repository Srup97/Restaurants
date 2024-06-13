import { firebaseApp } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { fileToBlod } from './helpers';

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
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado"
    }
    return result
}

export const closeSesion = () => {
    return firebase.auth().signOut();
}

export const loginWithEmailPassword = async (email, password) => {
    const result = {statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o Contraseña no validos"
    }
    return result
}

export const uploadImage = async (image, path, name) => {
    console.log("subiendo imagen");
    const result = { statusResponse: false, error: null, url: null };

    try {
        console.log("conexión a Firebase Storage");
        const ref = firebase.storage().ref(path).child(name);
        console.log("Referencia de almacenamiento creada:", ref);

        const blob = await fileToBlod(image);
        console.log("Blob generado:", blob);

        console.log("Intentando subir la imagen...");
        await ref.put(blob);
        console.log("Imagen subida exitosamente");

        const url = await ref.getDownloadURL();
        console.log("URL de la imagen:", url);

        result.statusResponse = true;
        result.url = url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        result.error = error;
    }
    return result;
};
  
export const updateProfile = async(data) => {
    console.log("actualizando perfil");
    const result = {statusResponse: true, error: null}
    try {
        await firebase.auth().currentUser.updateProfile(data)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result
}
