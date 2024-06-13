import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { isEmpty } from "lodash";

import { updateProfile } from "../../utils/actions";

export default function ChangeDisplayNameForm({
  displayName,
  setShowModal,
  toastRef,
  setReloadUser,
}) {
  const [newDisplayName, seNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    const result = await updateProfile({ displayName: newDisplayName });
    if (!result.statusResponse) {
      setError("Error al cambiar el nombre de usuario");
    }
    setReloadUser(true);
    toastRef.current.show("Nombre de usuario actualizado correctamente", 3000);
    setShowModal(false);
    setLoading(false);
  };

  const validateForm = () => {
    setError(null);
    if (isEmpty(newDisplayName)) {
      setError("El nombre no puede estar vacio");
      return false;
    }

    if (newDisplayName === displayName) {
      setError("Debes ingresar un nuevo nombre");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre de usuario"
        containerStyle={styles.input}
        inputStyle={styles.inputText}
        onChange={(e) => seNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
        defaultValue={displayName ? displayName : "Anónimo"}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
      />
      <Button
        title="Cambiar nombre de usuario"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F5",
    padding: 20,
  },
  input: {
    width: "100%",
    marginVertical: 10,
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
    backgroundColor: "#4285F4",
    paddingVertical: 15,
    borderRadius: 5,
  },
});
