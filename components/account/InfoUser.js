import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Avatar } from 'react-native-elements';
import { loadImageFromGallery } from '../../utils/helpers';

export default function InfoUser({user}) {
  console.log(user);
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1])
    console.log(result)
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
        onPress={() => {changePhoto()}}
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