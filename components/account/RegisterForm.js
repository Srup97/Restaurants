import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

export default function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormDate] = useState(defaultFormValues());

  const onChange = (e, type) => {
    setFormDate({
      ...formData,
      [type]: e.nativeEvent.text,
    });
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
      />
      <Input
        placeholder='Ingrese su contraseña'
        secureTextEntry={!passwordVisible}
        onChange={(e) => onChange(e, "password")}
        keyboardType='password'
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
        onPressOut={console.log(formData)}
      />
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
