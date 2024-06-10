import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import firebase from '../../utils/firebase'; // Ajusta la ruta según tu estructura de proyecto

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLogin(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (login === null) {
    return;
  }

  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
