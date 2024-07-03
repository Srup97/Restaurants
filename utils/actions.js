import { firebaseApp } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { fileToBlod } from './helpers';

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
    let isLogged = false;
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true);
    });
    return isLogged;
};

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
};

export const registerNewUser = async (email, password) => {
    const result = {statusResponse: true, error: null};
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = "Este correo ya ha sido registrado";
    }
    return result;
};

export const closeSesion = () => {
    return firebase.auth().signOut();
};

export const loginWithEmailPassword = async (email, password) => {
    const result = {statusResponse: true, error: null};
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = "Usuario o Contraseña no validos";
    }
    return result;
};

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
    const result = {statusResponse: true, error: null};
    try {
        await firebase.auth().currentUser.updateProfile(data);
    } catch (error) {
        result.statusResponse = false;
        result.error = error;
    }
    return result;
};

export const verifyPassword = async (password) => {
    const result = { statusResponse: true, error: null };
    const user = firebase.auth().currentUser;

    if (!user) {
        result.statusResponse = false;
        result.error = "No user is logged in.";
        return result;
    }

    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    try {
        await user.reauthenticateWithCredential(credentials);
    } catch (error) {
        result.statusResponse = false;
        result.error = error;
    }

    return result;
};


export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

// En tu archivo de acciones (actions.js, por ejemplo)
export const checkUserLogged = (callback) => {
  return firebase.auth().onAuthStateChanged((user) => {
    callback(user !== null);
  });
};


export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }

    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRestaurants = async (limitRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurants: null };

    try {
        const response = await db
            .collection("restaurants")
            .orderBy("createdAt", "desc")
            .limit(limitRestaurants)
            .get();

        if (response.docs.length > 0) {
            result.startRestaurants = response.docs[response.docs.length - 1];
        } else {
        }

        response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            result.restaurants.push(restaurant);
        });

    } catch (error) {
        console.error('Error obteniendo los restaurantes:', error); // Log de error más detallado
        result.statusResponse = false;
        result.error = error;
    }

    return result;
};


export const getMoreRestaurants = async (limit, start) => {
  try {
    const response = await db.collection("restaurants")
      .orderBy("createdAt", "desc")
      .startAfter(start)
      .limit(limit)
      .get();

    const restaurants = [];
    response.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      restaurants.push(restaurant);
    });

    const startRestaurants = response.docs[response.docs.length - 1];
    
    return { statusResponse: true, restaurants, startRestaurants };
  } catch (error) {
    console.error("Error fetching more restaurants:", error);
    return { statusResponse: false, error };
  }
};
