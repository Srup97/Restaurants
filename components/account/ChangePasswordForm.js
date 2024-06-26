import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Input, Icon } from "react-native-elements";
import { updatePassword, verifyPassword } from "../../utils/actions";
import { validatePassword } from "./ValidateData";

export default function ChangePasswordForm({
  setShowModal,
  toastRef
}) {

  const [formData, setFormData] = useState(defaultFormValues());
  const [errorNewPassword, setErrorNewPassword] = useState(null);
  const [errorOldPassword, setErrorOldPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = async () => {
    console.log(formData);
      if(!validatePassword(formData, setErrorNewPassword,setErrorOldPassword, setErrorConfirmPassword)){
        return;
      }

    setLoading(true);
    const passwordCheckResult = await verifyPassword(formData.oldPassword);
    if (!passwordCheckResult.statusResponse) {
      setLoading(false);
      setErrorOldPassword("Contraseña Incorrecta");
      return;
    }

    const result = await updatePassword(formData.newPassword);
    if (!result.statusResponse) {
      setErrorNewPassword("Error al cambiar el password, intente mas Tarde");
      setLoading(false);
      return;
    }

    toastRef.current.show("Password actualizado correctamente", 3000);
    setShowModal(false);
    setLoading(false);
  };

  return (
    <View style={styles.view}>
      
<Input
        placeholder="Ingrese tu contraseña Actual"
        secureTextEntry={!passwordVisible}
        containerStyle={styles.input}
        defaultValue={formData.oldPassword}
        inputStyle={styles.inputText}
        onChange={(e) => onChange(e, "oldPassword")}
        errorMessage={errorOldPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />

<Input
        placeholder="Ingrese tu nueva contraseña"
        secureTextEntry={!passwordVisible}
        defaultValue={formData.newPassword}
        containerStyle={styles.input}
        inputStyle={styles.inputText}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={errorNewPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />


<Input
        placeholder="Confirma la contraseña"
        secureTextEntry={!passwordVisible}
        containerStyle={styles.input}
        defaultValue={formData.confirmPassword}
        inputStyle={styles.inputText}
        onChange={(e) => onChange(e, "confirmPassword")}
        errorMessage={errorConfirmPassword}
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


const defaultFormValues = () => {
  return {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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
