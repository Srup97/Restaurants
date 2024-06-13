import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Icon } from 'react-native-elements';
import { loadImageFromGallery } from '../../utils/helpers';
import { updateProfile, uploadImage } from '../../utils/actions';

export default function InfoUser({ user, setLoading, setloadingText }) {
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    console.log("Iniciando cambio de foto");
    const result = await loadImageFromGallery([1, 1]);
    console.log("Resultado de loadImageFromGallery:", result);
    
    if (!result.status) {
      console.log("Carga de imagen cancelada o fallida");
      return;
    }
    
    setloadingText("Actualizando foto de perfil...");
    setLoading(true);
    
    const resultUploadImage = await uploadImage(result.image, "avatars", user.uid);
    console.log("Resultado de uploadImage:", resultUploadImage);
    
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("Error al subir la imagen");
      return;
    }

    const resultUpdateProfile = await updateProfile({ photoURL: resultUploadImage.url });
    setLoading(false);
    
    if (resultUpdateProfile.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
    } else {
      Alert.alert("Error al actualizar el perfil");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changePhoto}>
        <Avatar
          rounded
          size={100} // Tamaño del avatar más grande
          source={
            photoUrl
              ? { uri: photoUrl }
              : require("../../assets/avatar-default.jpg")
          }
          containerStyle={styles.avatar}
        />
        <Icon
          type="material-community"
          name="camera"
          color="#fff"
          containerStyle={styles.cameraIcon}
        />
      </TouchableOpacity>

      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {user.displayName ? user.displayName : "Anónimo"}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 30
  },
  avatar: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#489AF9',
    borderRadius: 20,
    padding: 5,
  },
  infoUser: {
    marginLeft: 20
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
});
