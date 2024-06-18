import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as Location from 'expo-location'


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
            'Debes dar los permisos para acceder a la galeria de imagenes'
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
    try {
        const file = await fetch(path);
        const blob = await file.blob();
        console.log("Blob creado en fileToBlod:", blob);
        return blob;
    } catch (error) {
        console.error("Error en fileToBlod:", error);
        throw error;
    }
};

export const getCurrentLocation = async () => {
    const response = { status: false, location: null };
    const resultPermissions = await Location.requestForegroundPermissionsAsync();

    if(resultPermissions.status === 'denied') {
            Alert.alert(
                'Error',
                'Debes dar los permisos para acceder a la ubicacion'
            );
            return response;
    }
    const position = await Location.getCurrentPositionAsync({});
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    }
    response.status = true;
    response.location = location;
    return response;
}