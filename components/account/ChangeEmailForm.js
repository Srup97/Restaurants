import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Input, Icon } from "react-native-elements";
import { validateDataLogin } from "./ValidateDataLogin";
import { updateEmail, verifyPassword } from "../../utils/actions";

export default function ChangeEmailForm({
  email,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [formData, setFormData] = useState(defaultFormValues(email));
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = async () => {
    if (!validateDataLogin(formData, setErrorEmail, setErrorPassword)) {
      return;
    }

    if (formData.email.toLowerCase() === email.toLowerCase()) {
      setErrorEmail("Debes de ingrear un email diferente al actual.");
      isValid = false;
    }

    if (formData.email === email) {
      setErrorEmail("Debes de ingrear un email diferente al actual.");
      return;
    }

    setLoading(true);
    const passwordCheckResult = await verifyPassword(formData.password);
    if (!passwordCheckResult.statusResponse) {
      setLoading(false);
      setErrorPassword("Contraseña Incorrecta");
      return;
    }

    const result = await updateEmail(formData.email);
    if (!result.statusResponse) {
      setErrorEmail("Error al cambiar el email o Este correo esta en uso");
      setLoading(false);
      return;
    }

    setReloadUser(true);
    toastRef.current.show("Email actualizado correctamente", 3000);
    setShowModal(false);
    setLoading(false);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nuevo Email"
        containerStyle={styles.input}
        inputStyle={styles.inputText}
        keyboardType="email-address"
        defaultValue={email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
      />
      <Input
        placeholder="Ingrese su contraseña"
        secureTextEntry={!passwordVisible}
        containerStyle={styles.input}
        inputStyle={styles.inputText}
        defaultValue={FormData.password}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
      <Button
        title="Cambiar email"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  );
}

const defaultFormValues = (oldEmail) => {
  return {
    email: oldEmail,
    password: "",
  };
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F5",
    padding: 20,
  },
  input: {
    width: "110%",
  },
  inputText: {
    color: "#333",
    paddingLeft: 10,
  },
  btnContainer: {
    width: "95%",
    marginTop: 20,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: "#489AF9",
    paddingVertical: 15,
    borderRadius: 5,
  },
});
