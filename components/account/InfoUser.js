import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-elements';
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
      <Avatar
        rounded
        size="large"
        source={
          photoUrl
            ? { uri: photoUrl }
            : require("../../assets/avatar-default.jpg")
        }
        onPress={() => { changePhoto() }}
      />

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
  infoUser: {
    marginLeft: 20
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})
