import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateData } from './ValidateData';
import { useNavigation } from '@react-navigation/native';
import { registerNewUser } from '../../utils/actions';
import Loading from '../Loading';



export default function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormDate] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const onChange = (e, type) => {
    setFormDate({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };
    
  const registerUser = async () => {
    if (!validateData(formData, setErrorEmail, setErrorPassword, setErrorConfirm)) {
      return;
    }
    setLoading(true)
    const result =  await registerNewUser(formData.email, formData.password)
    setLoading(false)
    if(!result.statusResponse){
      setErrorEmail(result.error);
      return
    }
      navigation.navigate("account")
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder='Ingrese su email'
        containerStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        keyboardType='email-address'
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        placeholder='Ingrese su contraseña'
        secureTextEntry={!passwordVisible}
        onChange={(e) => onChange(e, "password")}
        keyboardType='password'
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type='material-community'
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            onPress={togglePasswordVisibility}
          />
        }
        containerStyle={styles.input}
      />
      <Input
        placeholder='Confirme su contraseña'
        secureTextEntry={!confirmPasswordVisible}
        onChange={(e) => onChange(e, "confirmPassword")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirmPassword}
        rightIcon={
          <Icon
            type='material-community'
            name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            onPress={toggleConfirmPasswordVisibility}
          />
        }
        containerStyle={styles.input}
      />

      <Button
        title={"Registrar Usuario"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPressOut={() => registerUser()}
      />
    <Loading isVisible={loading} text="Creando Usuario" />
    </View>
  );
}

const defaultFormValues = () => {
    return {
        email: "",
        password: "",
        confirmPassword: ""
      }
  }


  

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
  },

  btnContainer: {
    marginTop: 20,
    width: "95%",
    alignSelf: "center"
},
btn: {
    backgroundColor: "#442484"
}
});
