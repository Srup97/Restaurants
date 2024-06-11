import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBpSHSDtsIf1R0S87tdu9wgHNOpeOtLcJA",
  authDomain: "restaurants-1e235.firebaseapp.com",
  projectId: "restaurants-1e235",
  storageBucket: "restaurants-1e235.appspot.com",
  messagingSenderId: "876828965816",
  appId: "1:876828965816:web:99a9554ef128d12bdaad4d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
