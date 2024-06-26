// permisos.js
import * as Camera from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export const requestCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};

export const requestStoragePermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
};

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};
