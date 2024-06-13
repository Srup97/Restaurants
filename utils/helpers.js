import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  export const loadImageFromGallery = async (array) => {
    const response = { status: false, image: null };
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Error',
            'Debes dar permisos para acceder a la galería de imágenes.'
        );
        return response;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    });

    if (result.canceled) { // Asegúrate de que la propiedad correcta sea "canceled"
        return response;
    }

    response.status = true;
    response.image = result.assets[0].uri; // Accede a la URI correctamente
    return response;
};


export const fileToBlod = async (path) => {
    const file = await fetch(path);
    const blob = await file.blob();
    return blob;
};
