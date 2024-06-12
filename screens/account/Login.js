import { ScrollView, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../../components/account/LoginForm';
import Toast from 'react-native-easy-toast';

export default function Login() {
  const toastRef = React.useRef(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require("../../assets/logo.png")}
          resizeMode='contain'
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <LoginForm toastRef={toastRef} />
          <CreateAccount />
        </View>
        <Divider style={styles.divider} />
      </ScrollView>
      <Toast ref={toastRef} position="center" />
    </KeyboardAvoidingView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();
  return (
    <Text 
      style={styles.register}
      onPress={() => navigation.navigate("register")}
    >
      ¿Aún no tienes una cuenta? 
      <Text style={styles.btnRegister}>
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  formContainer: {
    marginHorizontal: 40,
  },
  divider: {
    backgroundColor: '#442484',
    margin: 40,
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: "#442484",
    fontWeight: "bold",
  },
});
