import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import RegisterForm from '../../components/account/RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register() {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require("../../assets/logo.png")}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.formContainer}>
        <RegisterForm/>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // Asegúrate de que el fondo sea blanco o el color que desees
  },
  formContainer: {
    width: '100%',
  },
});
