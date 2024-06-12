import * as ImagePicker from 'expo-image-picker'

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const loadImageFromGallery = async(array) => {
    const response = { status: false, image: null }
    const resultPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (resultPermissions.status !== "granted") {
      Alert.alert(
        "Error",
        "Debes darle permisos para usar esta función"
      )
      return response
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({      
        allowsEditing: true,
        aspect: array
    })
    if (result.cancelled) {
        return response
    }
    response.status = true
    response.image = result.uri
    return response
}